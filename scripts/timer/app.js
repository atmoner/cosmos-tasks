import pm2 from 'pm2'
import dayjs from 'dayjs'

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
  processWork('Var1: ' + process.env.Cosmos_var1 + ' Var2: ' + process.env.Cosmos_var2)
  // Make your work here

}
setInterval(doStuff, process.env.COSMOS_TIMER); //time is in ms
