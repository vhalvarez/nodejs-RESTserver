const express = require('express');

const LoginControllers = require('../controllers/login');

const api = express.Router();

api.post('/login', LoginControllers.login);

module.exports = api;
