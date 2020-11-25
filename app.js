const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

//Load routings
const userRoutes = require('./routers/user')
const loginRoutes = require('./routers/login')
const categoryRoutes = require('./routers/category')
const productRoutes = require('./routers/product')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(express.static(path.resolve(__dirname + '/public')))

//  cORS
app.use(cors())

//Router Basic
app.use(`/api/v1`, userRoutes)
app.use(`/api/v1`, loginRoutes)
app.use(`/api/v1`, categoryRoutes)
app.use(`/api/v1`, productRoutes)

module.exports = app
