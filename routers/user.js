const express = require('express');
const UserControllers = require('../controllers/user');
const {
    verificaToken,
    verificaAdmin_Role,
} = require('../middlewares/auth');

const api = express.Router();

api.post(
    '/usuario',
    [verificaToken],
    UserControllers.createUser
);
api.put(
    '/usuario/:id',
    [verificaToken, verificaAdmin_Role],
    UserControllers.updateUser
);
api.get(
    '/usuario/',
    verificaToken,
    UserControllers.allUser
);
api.delete(
    '/usuario/:id',
    [verificaToken, verificaAdmin_Role],
    UserControllers.deleteUser
);

module.exports = api;
