import pm2 from 'pm2'
import dayjs from 'dayjs'
import fs from "fs"
import { bech32 } from "bech32"
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"
import { assertIsDeliverTxSuccess, SigningStargateClient, StargateClient, defaultRegistryTypes } from "@cosmjs/stargate"
import cosmosConfig from '../../cosmos.config.js'

// Dont remove this part!
function processWork(returnData) {
  //do Stuff here

  let today = dayjs();
  var timestamp = today.format( "YYYY-MM-DD HH:mm:ss" )
  console.log( '[' + timestamp + '] ' + returnData )
  pm2.restart({
    name      : process.env.name,
    env: {
      "COSMOS_LAST_UPDATE": timestamp
    }
  }, (err, proc) => {
    // Disconnects from PM2
    pm2.disconnect()
  })
}

function convertAddr(addr, toPrefix) {
  var decode = bech32.decode(addr)
  var newAddr = bech32.encode(toPrefix + 'valoper', decode.words)
  return newAddr
}

async function doStuff() {

  let buff = Buffer.from(process.env.COSMOS_PASS, 'base64')
  let secret = buff.toString('ascii')

  let finalWallet = fs.readFileSync('wallets/' + process.env.COSMOS_WALLET + '.json')
  let foundChain = cosmosConfig.find(element => element.coinLookup.viewDenom === process.env.COSMOS_CHAIN)
  let finalWalletData = JSON.parse(finalWallet)
  var finalWalletDecode = await DirectSecp256k1HdWallet.deserialize(JSON.stringify(finalWalletData.data), secret)

  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(finalWalletDecode.secret.data, {
    prefix: foundChain.coinLookup.addressPrefix
  });
  const [firstAccount] = await wallet.getAccounts()
  const rpcEndpoint = foundChain.rpcURL
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet)
  const validatorAddress = convertAddr(firstAccount.address, foundChain.coinLookup.addressPrefix)

  const MsgWithdrawValidatorCommission = defaultRegistryTypes[8][1] // MsgWithdrawValidatorCommission
  const withdrawValidatorCommissionMsg = {
    typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
    value: MsgWithdrawValidatorCommission.fromPartial({
      validatorAddress: validatorAddress
    }),
  }

  const fee = {
    amount: [
      {
        denom: foundChain.coinLookup.chainDenom,
        amount: foundChain.fee.amount,
      },
    ],
    gas: foundChain.fee.gas
  }

  const result = await client.signAndBroadcast(firstAccount.address, [withdrawValidatorCommissionMsg], fee, '')
  assertIsDeliverTxSuccess(result)

  processWork('Tx hash: ' + result.transactionHash)
}
setInterval(doStuff, process.env.COSMOS_TIMER) // time is in ms



