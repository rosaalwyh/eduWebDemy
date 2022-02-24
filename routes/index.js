const router = require('express').Router();
const authRoutes = require('./authRoutes');
const coursesRoutes = require('./coursesRoutes');
const categoryRoutes = require('./categoryRoutes');
const userRoutes = require('./userRoutes')
const detailUserRouter = require('./detailUserRoutes')
const HomeContoller = require('../controllers/homeController');

router.use(authRoutes)
router.use((req, res, next) => {
    if(!req.session.user || !req.session.user.id){
        const errMsg = `You must login first!`
        res.redirect(`/login?errMsg=${errMsg}`)
    } else {
        next()
    }
})
router.get('/', HomeContoller.home)
router.use(coursesRoutes)
router.use(userRoutes)
router.use(categoryRoutes)
router.use(detailUserRouter)

module.exports = router