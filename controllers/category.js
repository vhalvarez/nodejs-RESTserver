const Category = require('../models/category')

const categorias = {
	all: (req, res) => {
		Category.find({})
			.sort('descripcion')
			.populate('usuario', 'nombre email')
			.exec((err, categoriaDB) => {
				if (err) {
					return res.status(400).json({
						ok: false,
						err,
					})
				}

				if (!categoriaDB) {
					return res.status().json({
						ok: false,
						err: {
							message: 'No existen categorias',
						},
					})
				}

				res.json({
					ok: true,
					categorias: categoriaDB,
				})
			})
	},

	create: (req, res) => {
		const { descripcion } = req.body

		const categoria = new Category({
			descripcion,
			usuario: req.usuario._id,
		})

		categoria.save((err, categoryDB) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err,
				})
			}

			if (!categoryDB) {
				return res.status(400).json({
					ok: false,
					err,
				})
			}

			res.json({
				ok: true,
				categoria: categoryDB,
			})
		})
	},

	update: (req, res) => {
		const id = req.params.id
		const { descripcion } = req.body

		Category.findByIdAndUpdate(
			id,
			{ descripcion },
			{ new: true, runValidators: true },
			(err, categoriaDB) => {
				if (err) {
					return res.status(500).json({
						ok: false,
						err,
					})
				}

				if (!categoriaDB) {
					return res.status(400).json({
						ok: false,
						err: {
							message:
								'No se pudo actualizar la categoria',
						},
					})
				}

				res.json({
					ok: true,
					categoria: {
						message: 'Categoria actualizada',
						categoriaDB,
					},
				})
			}
		)
	},

	delete: (req, res) => {
		const id = req.params.id

		Category.findByIdAndRemove(id, (err, categoriaDB) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err,
				})
			}

			if (!categoriaDB) {
				return res.status(400).json({
					ok: false,
					err: {
						message: 'No se pudo eliminar la categoria',
					},
				})
			}

			res.json({
				ok: true,
				message: 'Categoria borrada',
				categoria: categoriaDB.descripcion,
			})
		})
	},

	categoryId: (req, res) => {
		const id = req.params.id

		Category.findById(id, (err, categoriaDB) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err,
				})
			}

			if (!categoriaDB) {
				return res.status(400).json({
					ok: false,
					err: {
						message: 'No se encontro la categoria',
					},
				})
			}

			res.json({
				ok: true,
				message:
					'Se encontro la categoria ' +
					categoriaDB.descripcion,
			})
		})
	},
}

module.exports = categorias
