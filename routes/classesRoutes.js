const classesRouter = require('express').Router();
const ClassesController =  require('../controllers/classesController');

classesRouter.get('/class', ClassesController.getClass)
classesRouter.get('/class/add', ClassesController.addClass)
classesRouter.post('/class/add', ClassesController.createClass)
classesRouter.get('/class/edit/:id', ClassesController.editClass)
classesRouter.post('/class/edit/:id', ClassesController.updateClass)
classesRouter.get('/class/delete/:id', ClassesController.deleteClass)

module.exports = classesRouter