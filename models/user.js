const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const rolesValidos = {
	values: ['ADMIN_ROLE', 'USER_ROLE'],
	message: '{VALUE} no es un rol valido.'
}

const usuarioSchema = Schema({
	nombre: {
		type: String,
		require: [true, 'El nombre es necesario.'],
	},
	email: {
		type: String,
		require: [true, 'El correo es necesario.'],
		unique: true
	},
	password: {
		type: String,
		require: [true, 'La contraseña es obligatoria.'],
	},
	img: { 
        type: String, 
        require: false 
    },
	role: {
		type: 'String',
		default: 'USER_ROLE',
		enum: rolesValidos
    },
	estado: {
        type: Boolean,
        default: true
    },
	google: {
        type: Boolean,
        default: false
    },
})

usuarioSchema.plugin( uniqueValidator, {
	message: 'El {PATH} debe de ser único'
} )

module.exports = mongoose.model('User', usuarioSchema)