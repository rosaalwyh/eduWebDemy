const userRouter = require('express').Router();
const UserController = require('../controllers/userController');

userRouter.get('/user', UserController.getUser)
userRouter.get('/user/add', UserController.addUser)
userRouter.post('/user/add', UserController.createUser)
userRouter.get('/user/edit/:id', UserController.editUser)
userRouter.post('/user/edit/:id', UserController.updateUser)
userRouter.get('/user/delete/:id', UserController.deleteUser)

module.exports = userRouter