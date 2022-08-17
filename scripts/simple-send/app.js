import pm2 from 'pm2'
import dayjs from 'dayjs'
import fs from 'fs'
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"
import { assertIsDeliverTxSuccess, SigningStargateClient, StargateClient } from "@cosmjs/stargate"
import cosmosConfig from '../../cosmos.config.js'

// Dont remove this part!
function processWork(returnData) {
  let today = dayjs();
  var timestamp = today.format("YYYY-MM-DD HH:mm:ss")
  console.log( '[' + timestamp + '] ' + returnData )
  pm2.restart({
    name      : process.env.name,
    env: {
      "COSMOS_LAST_UPDATE": timestamp
    }
  }, (err, proc) => {
    pm2.disconnect()
  })
}

async function doStuff() {

  let buff = Buffer.from(process.env.COSMOS_PASS, 'base64')
  let secret = buff.toString('ascii')

  let finalWallet = fs.readFileSync('wallets/' + process.env.COSMOS_WALLET + '.json')
  let foundChain = cosmosConfig.find(element => element.coinLookup.viewDenom === process.env.COSMOS_CHAIN)
  var finalWalletDecode = await DirectSecp256k1HdWallet.deserialize( finalWallet, secret )

  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(finalWalletDecode.secret.data, {
    prefix: foundChain.coinLookup.addressPrefix
  });
  const [firstAccount] = await wallet.getAccounts()
  const rpcEndpoint = foundChain.rpcURL
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet)
  const recipient = process.env.sendTo
  const amount = {
    denom: foundChain.coinLookup.chainDenom,
    amount: process.env.amount,
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

  const result = await client.sendTokens( firstAccount.address, recipient, [amount], fee, "" )
  assertIsDeliverTxSuccess(result)
  processWork('Tx hash: ' + result.transactionHash)

}
setInterval(doStuff, process.env.COSMOS_TIMER); //time is in ms
