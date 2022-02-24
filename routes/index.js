const router = require('express').Router();
const authRoutes = require('./authRoutes');
const coursesRoutes = require('./coursesRoutes');
const classesRoutes = require('./classesRoutes');
const categoryRoutes = require('./categoryRoutes');
const userRoutes = require('./userRoutes')
const detailUserRouter = require('./detailUserRoutes')
const HomeContoller = require('../controllers/homeController');

router.get('/', HomeContoller.home)

router.use(authRoutes)
router.use(categoryRoutes)
router.use(coursesRoutes)
router.use(classesRoutes)
router.use(userRoutes)
router.use(detailUserRouter)

module.exports = router