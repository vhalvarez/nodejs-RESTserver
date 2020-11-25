const express = require('express')
const api = express.Router()
const ProductControllers = require('../controllers/product')
const { verificaToken } = require('../middlewares/auth')

api.get('/producto', verificaToken, ProductControllers.all)
api.post('/producto', verificaToken, ProductControllers.create)
api.put('/producto/:id', verificaToken, ProductControllers.update)
api.get('/producto/:id', verificaToken, ProductControllers.productID)
api.delete('/producto/:id', verificaToken, ProductControllers.delete)
api.get('/producto/search/:search', verificaToken, ProductControllers.search)

module.exports = api
