const fs = require('fs')
const { Router } = require('express')
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const authConfig = require('../../auth.config.js')

const router = Router()

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json())

router.post('/auth/login', function (req, res, next) {
  if (req.body.name === authConfig.default[0].user && req.body.password === authConfig.default[0].pass) {
    const token = jwt.sign({ sub: authConfig.default[0].user }, authConfig.default[0].jwtKey, { expiresIn: '7d' });
    res.json(token)
  } else
    res.json('false')
})

module.exports = router


