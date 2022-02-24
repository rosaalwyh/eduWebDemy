const detailUserRouter = require('express').Router();
const DetailUserController =  require('../controllers/detailUserController');

detailUserRouter.get('/detailUser', DetailUserController.getdetailUser)
detailUserRouter.get('/detailUser/add', DetailUserController.addDetailUser)
detailUserRouter.post('/detailUser/add', DetailUserController.createDetailUser)
detailUserRouter.get('/detailUser/edit/:id', DetailUserController.editDetailUser)
detailUserRouter.post('/detailUser/edit/:id', DetailUserController.updateDetailUser)
detailUserRouter.get('/detailUser/delete/:id', DetailUserController.deleteDetailUser)

module.exports = detailUserRouter