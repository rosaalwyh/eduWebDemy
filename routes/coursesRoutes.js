const coursesRouter = require('express').Router();

const CoursesController =  require('../controllers/coursesController');

coursesRouter.get('/courses', CoursesController.getCourses)
coursesRouter.get('/courses/add', CoursesController.addCourses)
coursesRouter.post('/courses/add', CoursesController.createCourses)
coursesRouter.get('/courses/edit/:id', CoursesController.editCourses)
coursesRouter.post('/courses/edit/:id', CoursesController.updateCourses)
coursesRouter.get('/courses/delete/:id', CoursesController.deleteCourses)

module.exports = coursesRouter