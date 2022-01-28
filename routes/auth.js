const express = require('express')
const router = express.Router()

const user = require('../controller/auth')

router.post('/login', user.login)
router.get('/logout', user.logout)

module.exports = router