const detailUserRouter = require('express').Router();
const DetailUserController =  require('../controllers/detailUserController');
const { isAdmin } = require('../middleware');

detailUserRouter.get('/detailUser', isAdmin, DetailUserController.getdetailUser)
detailUserRouter.get('/detailUser/add', isAdmin, DetailUserController.addDetailUser)
detailUserRouter.post('/detailUser/add', isAdmin, DetailUserController.createDetailUser)
detailUserRouter.get('/detailUser/edit/:id', isAdmin, DetailUserController.editDetailUser)
detailUserRouter.post('/detailUser/edit/:id', isAdmin, DetailUserController.updateDetailUser)
detailUserRouter.get('/detailUser/delete/:id', isAdmin, DetailUserController.deleteDetailUser)

module.exports = detailUserRouter