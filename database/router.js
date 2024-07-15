const Router = require('express')
const router = new Router()
const routesController = require('./controller')
router.post('/products', routesController.createProduct)
router.get('/products', routesController.getProducts)
router.put('/products', routesController.updateProduct)
router.delete('/products/:id', routesController.deleteProduct)

module.exports = router