const express = require('express')
const api = express.Router()
const {
	verificaToken,
	verificaAdmin_Role,
} = require('../middlewares/auth')
const CategoryControllers = require('../controllers/category')

//mostrar todas las categorias
api.get('/categoria', verificaToken, CategoryControllers.all)
//crear categoria
api.post(
	'/categoria',
	[verificaToken, verificaAdmin_Role],
	CategoryControllers.create
)
//actualizar categoria
api.put(
	'/categoria/:id',
	[verificaToken, verificaAdmin_Role],
	CategoryControllers.update
)
//eliminar categoria
api.delete(
	'/categoria/:id',
	[verificaToken, verificaAdmin_Role],
	CategoryControllers.delete
)
//buscar categoria por id
api.get(
	'/categoria/:id',
	verificaToken,
	CategoryControllers.categoryId
)

module.exports = api
