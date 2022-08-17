import pm2 from 'pm2'
import axios from 'axios'
import dayjs from 'dayjs'
import cosmosConfig from '../../cosmos.config.js'

// Dont remove this part!
function processWork(returnData) {
  //do Stuff here
  let today = dayjs();
  var timestamp = today.format("YYYY-MM-DD HH:mm:ss")
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

function doStuff() {
  // Make your work here
  let foundChain = cosmosConfig.find(element => element.coinLookup.viewDenom === /*'BitCanna' */ process.env.COSMOS_CHAIN);
  console.log(foundChain.coingeckoId)
  // Make a request for a user with a given ID
  axios.get('https://api.coingecko.com/api/v3/simple/price?ids=' + foundChain.coingeckoId + '&vs_currencies=usd')
  .then(function (response) {
    // handle success
    //console.log('$ ' + response.data[foundChain.coingeckoId].usd)
    processWork('$ ' + response.data[foundChain.coingeckoId].usd)
  })
  .catch(function (error) {
    // handle error
    console.log(error)
  })
}
setInterval(doStuff, process.env.COSMOS_TIMER); //time is in ms
