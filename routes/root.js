var express = require('express')
var router = express.Router()

router.get('/', async (req, res) => {
   res.send({ msg: 'semangat !' })
})

module.exports = router
