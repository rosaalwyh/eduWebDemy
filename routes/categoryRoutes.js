const categoryRouter = require('express').Router();
const CategoryController = require('../controllers/categoryController');

categoryRouter.get('/category', CategoryController.getCategory)
categoryRouter.get('/category/add', CategoryController.addCategory)
categoryRouter.post('/category/add', CategoryController.createCategory)
categoryRouter.get('/category/edit/:id', CategoryController.editCategory)
categoryRouter.post('/category/edit/:id', CategoryController.updateCategory)
categoryRouter.get('/category/delete/:id', CategoryController.deleteCategory)

module.exports = categoryRouter