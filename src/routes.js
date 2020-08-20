const express = require('express');
const { default: UserController } = require('./controllers/UserController');

const userController = new UserController
const routes = express.Router();

routes.get('/users', userController.index)
routes.post('/users', userController.create)

module.exports = routes