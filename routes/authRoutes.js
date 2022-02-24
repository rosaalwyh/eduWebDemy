const authRoutes = require('express').Router();
const LoginController = require('../controllers/loginController');

authRoutes.get('/registration', LoginController.formRegistration)
authRoutes.post('/registration', LoginController.registration)
authRoutes.get('/login', LoginController.formLogin)

module.exports = authRoutes