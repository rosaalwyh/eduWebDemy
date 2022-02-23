const router = require('express').Router();
const coursesRoutes = require('./classesRoutes');
const classesRoutes = require('./classesRoutes');
const categoryRoutes = require('./categoryRoutes');
const HomeContoller = require('../controllers/homeController');

router.get('/', HomeContoller.home)

router.use(categoryRoutes)
router.use(coursesRoutes)
router.use(classesRoutes)

module.exports = router