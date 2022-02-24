const categoryRouter = require('express').Router();
const CategoryController = require('../controllers/categoryController');
const { isAdmin } = require('../middleware');

categoryRouter.get('/category', isAdmin, CategoryController.getCategory)
categoryRouter.get('/category/add', isAdmin, CategoryController.addCategory)
categoryRouter.post('/category/add', isAdmin, CategoryController.createCategory)
categoryRouter.get('/category/edit/:id', isAdmin, CategoryController.editCategory)
categoryRouter.post('/category/edit/:id', isAdmin, CategoryController.updateCategory)
categoryRouter.get('/category/delete/:id', isAdmin, CategoryController.deleteCategory)

module.exports = categoryRouter