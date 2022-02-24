const userRouter = require('express').Router();
const UserController = require('../controllers/userController');
const { isAdmin } = require('../middleware');

userRouter.get('/user', isAdmin, UserController.getUser)
userRouter.get('/user/add', isAdmin, UserController.addUser)
userRouter.post('/user/add', isAdmin, UserController.createUser)
userRouter.get('/user/edit/:id', isAdmin, UserController.editUser)
userRouter.post('/user/edit/:id', isAdmin, UserController.updateUser)
userRouter.get('/user/delete/:id', isAdmin, UserController.deleteUser)

module.exports = userRouter