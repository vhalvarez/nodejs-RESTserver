const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');

//Load routings
const userRoutes = require('./routers/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use(cors());

//Router Basic
app.use(`/api/v1`, userRoutes);

module.exports = app;
