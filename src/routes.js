const express = require('express');
const { default: UserController } = require('./controllers/UserController');

const userController = new UserController
const routes = express.Router();

routes.get('/users/:id', userController.index)
routes.post('/users', userController.create)
routes.put('/users', userController.update)
routes.delete('/users/:id', userController.delete)

module.exports = routes