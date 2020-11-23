const express = require('express');
const UserControllers = require('../controllers/user');

const api = express.Router();

api.post('/usuario', UserControllers.createUser);
api.put('/usuario/:id', UserControllers.updateUser);
api.get('/usuario/', UserControllers.allUser);
api.delete('/usuario/:id', UserControllers.deleteUser);

module.exports = api;
