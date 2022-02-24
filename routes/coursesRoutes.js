const coursesRouter = require('express').Router();
const { isAdminTeacher } = require('../middleware');
const CoursesController =  require('../controllers/coursesController');

//backend
coursesRouter.get('/courses', isAdminTeacher,  CoursesController.getCourses)
coursesRouter.get('/courses/add',isAdminTeacher, CoursesController.addCourses)
coursesRouter.post('/courses/add', isAdminTeacher, CoursesController.createCourses)
coursesRouter.get('/courses/edit/:id', isAdminTeacher, CoursesController.editCourses)
coursesRouter.post('/courses/edit/:id', isAdminTeacher, CoursesController.updateCourses)
coursesRouter.get('/courses/delete/:id', isAdminTeacher, CoursesController.deleteCourses)

//frontend
coursesRouter.get('/courses/student', CoursesController.getCourses)
coursesRouter.get('/courses/student/detail/:id', CoursesController.detailCourses)
module.exports = coursesRouter