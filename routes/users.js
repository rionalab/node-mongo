var express = require('express')
var router = express.Router()
const c = require('../controllers/users')

router.get('/', c.index)
router.get('/:id', c.show)
router.post('/', c.create)
router.put('/:id', c.update)
router.delete('/', c.destroyAll)
router.delete('/:id', c.destroy)

module.exports = router
