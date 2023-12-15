const { Router } = require('express')
const { getProducts, postProduct, deleteProduct } = require('./controller')
const multer = require('multer')
const router = Router()

const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, 'public/products/images')
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname)
    },
})

const upload = multer({ storage })

router.get('/', getProducts)
router.post('/', upload.single('datas'), postProduct) //depois do single colocar o nome do name do elemento que trás esse dado
router.delete('/', deleteProduct)

module.exports = router