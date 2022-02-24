const detailUserRouter = require('express').Router();
const DetailUserController =  require('../controllers/detailUserController');
const { isAdmin } = require('../middleware');

detailUserRouter.get('/detailUser/add', DetailUserController.addDetailUser)
detailUserRouter.post('/detailUser/add', DetailUserController.createDetailUser)
detailUserRouter.post('/profileUser/add', DetailUserController.createDetailUser)
detailUserRouter.get('/detailUser/edit/:id', isAdmin, DetailUserController.editDetailUser)
detailUserRouter.post('/detailUser/edit/:id', isAdmin, DetailUserController.updateDetailUser)
detailUserRouter.get('/detailUser/delete/:id', isAdmin, DetailUserController.deleteDetailUser)
detailUserRouter.get('/detailUser/:id', isAdmin, DetailUserController.getdetailUser)
detailUserRouter.get('/profiles/user/:id', DetailUserController.addDetailUser)


module.exports = detailUserRouter