const pm2 = require('pm2')
const fs = require('fs')
const { Router } = require('express')
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const authConfig = require('../../auth.config.js')

const router = Router()
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json())

function checkToken(token, res) {
  try {
    const decoded = jwt.verify(token, authConfig.default[0].jwtKey);
    return true
  } catch (err) {
    return false
  }
}

/* POST wallet add */
router.post('/wallets/add', function (req, res, next) {
  var checkTokenReturn = checkToken(req.body.token, res)
  if (checkTokenReturn) {
    var pathTo = __dirname.replace('/api/routes', '')
    fs.writeFileSync(pathTo + '/wallets/' + req.body.name + '.json', '{ "address": "'+req.body.address+'", "data": '+req.body.data+' }')
    res.json('Wallet added')
  } else
    res.status(401).json("Invalid Token")
})

/* POST wallet list */
router.post('/wallets/list', function (req, res, next) {
  var checkTokenReturn = checkToken(req.body.token, res)
  if (checkTokenReturn) {
    var pathTo = __dirname.replace('/api/routes', '')
    fs.readdir(pathTo + '/wallets/', (err, files) => {
      var wallets = []
      files.forEach(file => {
        if (file !== 'index.js')
          wallets.push({ name: file.replace('.json', ''), path: pathTo + '/wallets/' + file })
      })
      res.json(wallets)
    })
  } else
    res.status(401).json("Invalid Token")
})

/* POST wallet delete */
router.post('/wallets/delete', function (req, res, next) {
  var checkTokenReturn = checkToken(req.body.token, res)
  if (checkTokenReturn) {
    var pathTo = __dirname.replace('/api/routes', '')
    fs.unlinkSync(pathTo + '/wallets/' + req.body.name + '.json')
    res.json('Wallet removed')
  } else
    res.status(401).json("Invalid Token")
})

module.exports = router

