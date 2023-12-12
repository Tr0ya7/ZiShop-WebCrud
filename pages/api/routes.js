const { Router } = require('express')
const { getProducts, postProduct, deleteProduct } = require('./controller')
const router = Router()

router.get('/', getProducts)
router.post('/', postProduct)
router.delete('/', deleteProduct)

module.exports = router