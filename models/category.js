const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = Schema({
    descripcion : { type: String, unique: true, required: [true, 'Se necesita la descripción.']},
    usuario: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Category', categorySchema)