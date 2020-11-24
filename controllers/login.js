const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

const auth = {
	login: (req, res) => {
		const { email, password } = req.body

		User.findOne({ email }, (err, userDB) => {
			if (err) {
				return res.status(500).json({ ok: false, err })
			}

			if (!userDB) {
				return res.status(400).json({
					ok: false,
					message: 'Usuario incorrecto.',
				})
			}

			if (!bcrypt.compareSync(password, userDB.password)) {
				return res.status(400).json({
					ok: false,
					message: 'Contraseña incorrecta.',
				})
			}

			let token = jwt.sign(
				{
					usuario: userDB,
				},
				process.env.SEED,
				{ expiresIn: process.env.CADUCIDAD_TOKEN }
			)

			res.json({
				ok: true,
				usuario: userDB,
				token,
			})
		})
	},

	google: async (req, res) => {
		async function verify(token) {
			const ticket = await client.verifyIdToken({
				idToken: token,
				audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
				// Or, if multiple clients access the backend:
				//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
			})
			const payload = ticket.getPayload()

			return {
				name: payload.name,
				email: payload.email,
				img: payload.picture,
				google: true,
			}
		}

		let token = req.body.idtoken

		let googleUser = await verify(token).catch((e) => {
			return res.status(403).json({
				ok: false,
				err: e,
			})
		})

		User.findOne({ email: googleUser.email }, (err, userDB) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				})
			}

			if (userDB) {
				if (userDB.google === false) {
					return res.status(400).json({
						ok: false,
						err: {
							message:
								'Debe de usar su autenticación normal',
						},
					})
				} else {
					let token = jwt.sign(
						{
							usuario: userDB,
						},
						process.env.SEED,
						{ expiresIn: process.env.CADUCIDAD_TOKEN }
					)

					return res.json({
						ok: true,
						usuario: userDB,
						token,
					})
				}
			} else {
				//Si el usuario no existe en nuestra BD
				let usuario = new User()

				usuario.nombre = googleUser.nombre
				usuario.email = googleUser.email
				usuario.img = googleUser.img
				usuario.google = true
				usuario.password = ':)'

				usuario.save((err, usuarioDB) => {
					if (err) {
						return res.status(400).json({
							ok: false,
							err,
						})
                    }
                    
                    let token = jwt.sign(
						{
							usuario: userDB,
						},
						process.env.SEED,
						{ expiresIn: process.env.CADUCIDAD_TOKEN }
					)

					return res.json({
						ok: true,
						usuario: usuarioDB,
						token,
					})
				})
			}
		})
	},
}

module.exports = auth
