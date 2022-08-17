const pm2 = require('pm2')
const fs = require('fs')
const { Router } = require('express')
var bodyParser = require('body-parser')

const router = Router()

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json())

/* POST wallet add */
router.post('/wallets/add', function (req, res, next) {
  var pathTo = __dirname.replace('/api/routes', '')
  fs.writeFileSync(pathTo + '/wallets/' + req.body.name + '.json', req.body.data)
  res.json('Wallet added')
})

/* POST wallet list */
router.get('/wallets/list', function (req, res, next) {
  var pathTo = __dirname.replace('/api/routes', '')
  fs.readdir(pathTo + '/wallets/', (err, files) => {
    var wallets = []
    files.forEach(file => {
      if (file !== 'index.js')
        wallets.push({ name: file.replace('.json', ''), path: pathTo + '/wallets/' + file })
    })
    res.json(wallets)
  })
})

/* POST wallet delete */
router.post('/wallets/delete', function (req, res, next) {
  var pathTo = __dirname.replace('/api/routes', '')
  fs.unlinkSync(pathTo + '/wallets/' + req.body.name + '.json')
  res.json('Wallet removed')
})

module.exports = router

