const pm2 = require('pm2')
const fs = require('fs')
const { Router } = require('express')
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
let bech32 = require('bech32')
let axios = require('axios')

const authConfig = require('../../auth.config.js')
const cosmosConfig = require('../../cosmos.config.js')

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
      var addr = []
      files.forEach(file => {
        var copieAddr = [];
        if (file !== 'index.js') {
          var getAddr = fs.readFileSync(pathTo + '/wallets/' + file)
          getAddr = JSON.parse(getAddr)
          cosmosConfig.default.forEach( async function(item) {
            var decode = bech32.decode(getAddr.address)
            var newAddr = bech32.encode(item.coinLookup.addressPrefix, decode.words)
            copieAddr.push({ chain: item.name, addr: newAddr, viewDenom: item.coinLookup.viewDenom, img: item.coinLookup.icon, mintscanId: 'https://www.mintscan.io/' + item.mintscanId + '/account/' + newAddr });
          });
          wallets.push({ name: file.replace('.json', ''), address: getAddr.address, allAddress: copieAddr, path: pathTo + '/wallets/' + file })
        }
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

