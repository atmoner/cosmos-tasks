const { Router } = require('express')
const pm2 = require('pm2')
var bodyParser = require('body-parser')
const fs = require('fs')
const os = require('os');

const router = Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

/* GET PM2 process listing. */
router.get('/process', function (req, res, next) {
  pm2.list((err, list) => {
    const structDatas = []
    list.forEach(function(item){
      structDatas.push({ item })
    });
    res.json(structDatas)
  })
})
/* POST PM2 process to start. */
router.post('/process/start', function (req, res, next) {
  pm2.start({
      name: req.body.name
    }, (err, proc) => {
    // Disconnects from PM2

  }, function(err, apps) {
    if (err) { throw err }
  })
  res.json('true')
})
/* POST PM2 process to stop. */
router.post('/process/stop', function (req, res, next) {
  pm2.stop( req.body.id , (err, proc) => {
    // Disconnects from PM2
    res.json('true')
  }, function(err, apps) {
    if (err) { throw err }
  })
})
/* POST PM2 process to delete. */
router.post('/process/delete', function (req, res, next) {
  pm2.delete( req.body.id , (err, proc) => {
    // Disconnects from PM2
    res.json('true')
  }, function(err, apps) {
    if (err) { throw err }
  })
})
/* POST PM2 process to add. */
router.post('/process/add', function (req, res, next) {

  var finalVariable = {
    "COSMOS_NAME": req.body.name,
    "COSMOS_SCRIPT": req.body.script,
    "COSMOS_TIMER": req.body.timer,
    "COSMOS_TIMER_UI": req.body.timer_ui,
    "COSMOS_CHAIN": req.body.chain,
    "COSMOS_LOGO": req.body.logo,
  }

  req.body.varPersonalised.forEach(function(item){
    finalVariable[item.key] = item.value
  })

  if (req.body.authData !== false) {
    finalVariable["COSMOS_WALLET"] = req.body.authData.wallet
    finalVariable["COSMOS_PASS"] = req.body.authData.pass
  }

  pm2.start({
    script    : req.body.script,
    name      : req.body.name,
    env       : finalVariable
  }, function(err, apps) {
    if (err) {
      return pm2.disconnect()
    }
  })
  res.json('true')
})
/* POST PM2 process log. */
router.post('/process/log', function (req, res, next) {
  try {
    const homePath = os.homedir()
    const data = fs.readFileSync(homePath + '/.pm2/logs/' + req.body.name + '-out.log', 'utf8');
    res.json(data)
  } catch (err) {
    res.json(err)
  }

})

module.exports = router
