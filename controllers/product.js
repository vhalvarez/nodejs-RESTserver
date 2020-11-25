const Product = require('../models/product')

const productos = {
	all: (req, res) => {
		//trae todo los productos
		//populate

		Product.find({ disponible: true })
			.populate('usuario', 'nombre email')
			.populate('categoria', 'descripcion')

			.exec((err, productos) => {
				if (err) {
					return res.status(500).json({
						ok: false,
						err,
					})
				}

				res.json({
					ok: true,
					productos,
				})
			})
	},

	productID: (req, res) => {
		let id = req.params.id

		Product.findById(id)
			.populate('usuario', 'nombre email')
			.populate('categoria', 'descripcion')
			.exec((err, productoDB) => {
				if (err) {
					return res.status(500).json({
						ok: false,
						err,
					})
				}

				if (!productoDB) {
					return res.status(500).json({
						ok: false,
						message: 'No existe el id',
					})
				}

				res.json({
					ok: true,
					productoDB,
				})
			})
	},

	create: (req, res) => {
		//grabar el usuario
		//grabar una categoria del listado

		const {
			nombre,
			precioUni,
			descripcion,
			disponible,
			categoria,
		} = req.body

		const product = new Product({
			usuario: req.usuario._id,
			nombre,
			precioUni,
			descripcion,
			disponible,
			categoria,
		})

		product.save((err, productoDB) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err,
				})
			}

			if (!productoDB) {
				return res.status(400).json({
					ok: false,
					message: 'No se pudo guardar el producto',
				})
			}

			res.json({
				ok: true,
				productoDB,
			})
		})
	},

	update: (req, res) => {
		//grabar usuario
		//grabar una categoria del listado
		const id = req.params.id
		const body = req.body

		Product.findById(id, (err, productoDB) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err,
				})
			}

			if (!productoDB) {
				return res.status(400).json({
					ok: false,
					message: 'No existe el id',
				})
			}

			productoDB.nombre = body.nombre
			productoDB.precioUni = body.precioUni
			productoDB.descripcion = body.descripcion
			productoDB.categoria = body.categoria
			productoDB.disponible = body.disponible

			productoDB.save((err, productoUpdate) => {
				if (err) {
					return res.status(500).json({
						ok: false,
						err,
					})
				}

				if (!productoUpdate) {
					return res.status(400).json({
						ok: false,
						message: 'No se actualizo el producto',
					})
				}

				res.json({
					ok: true,
					productoUpdate,
				})
			})
		})
	},

	delete: (req, res) => {
		//disponible is false
		let id = req.params.id

		Product.findById(id, (err, productDB) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err,
				})
			}

			if (!productDB) {
				return res.status(400).json({
					ok: false,
					message: 'ID no existe',
				})
			}

			productDB.disponible = false

			productDB.save((err, productDelete) => {
				if (err) {
					return res.status(500).json({
						ok: false,
						err,
					})
				}

				if (!productDelete) {
					return res.status(400).json({
						ok: false,
						message: 'No se pudo eliminar el producto',
					})
				}

				res.json({
					ok: true,
					message: 'Producto eliminado',
					productDelete,
				})
			})
		})
	},

	search: (req, res) => {
		let search = req.params.search

		let regex = new RegExp(search, 'i')

		Product.find({ nombre: regex })
			.populate('categoria', 'nombre')
			.exec((err, productos) => {
				if (err) {
					return res.status(500).json({
						ok: false,
						err,
					})
				}

				if (!productos) {
					return res.status(400).json({
						ok: false,
						message: 'No existe el producto',
					})
				}

				res.json({
					ok: true,
					productos,
				})
			})
	},
}

module.exports = productos
