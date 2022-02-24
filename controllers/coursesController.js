const { Course, Category, User, UserCourse } = require('../models');
class CoursesController {

    static allStartup(req, res) {
        let role = req.query.sortBy
        Startups.getStartUpByValuation(role)
            .then((data) => {
                res.render('allStartup', { data, formatCurrency })
            })
            .catch((error) => {
                res.send(error)
            })
    }

    static getCourses(req, res) {
        let { courseName, sorted, search } = req.query
        let method;
        if (sorted) {
            method = sorted
        } else {
            method = search
        }
        Course.filteredCourse(method)
            .then((courses) => {
                if (req.session.user.role === "Student") {
                    res.render('frontend/courses/index', { courses, courseName })
                } else {
                    res.render('courses/course', { courses, courseName })
                }
            })
            .catch((error) => {
                res.send(error)
            })
    }

    static addCourses(req, res) {
        let { errMsg } = req.query
        let category
        Category.findAll()
            .then((categories) => {
                category = categories
                return User.findAll()
            })
            .then((users) => {
                if (!errMsg) {
                    res.render('./courses/addCourse', { category, users, errMsg })
                } else {
                    errMsg = errMsg.split(',')
                    res.render('./courses/addCourse', { category, users, errMsg })
                }
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static createCourses(req, res) {
        let { name, description, duration, CategoryId, UserId } = req.body
        let newUser = { name, description, duration, CategoryId, UserId }
        let data;
        Course.create(newUser)
            .then((course) => {
                data = {
                    CourseId: course.id,
                    UserId
                }
                return UserCourse.create(data)
            })
            .then(() => {
                console.log(data);
                res.redirect('/courses')
            })
            .catch((err) => {
                console.log(err);
                let errMsg = err.errors.map((errEl) => errEl.message)
                res.redirect(`/courses/add?errMsg=${errMsg}`)
            })
    }

    static editCourses(req, res) {
        let { id } = req.params
        let { errMsg } = req.query
        let category
        let users
        Category.findAll()
            .then((categories) => {
                category = categories
                return UserCourse.findAll({ include: { model: User } })
            })
            .then((user) => {
                users = user
                return Course.findOne({ id: users.UserId })
            })
            .then((course) => {
                res.render('./courses/editCourse', { course, users, category, errMsg })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static updateCourses(req, res) {
        let { id } = req.params
        let { name, description, duration, CategoryId, UserId } = req.body
        let editedCourse = { name, description, duration, CategoryId, UserId }
        let data;
        Course.update((editedCourse), { where: { id } })
            .then((course) => {
                res.redirect('/courses')
            })
            .catch((err) => {
                console.log(err);
                let errMsg = err.errors.map((errEl) => errEl.message)
                res.redirect(`/courses/edit/${id}?errMsg=${errMsg}`)
            })
    }

    static deleteCourses(req, res) {
        let { id } = req.params
        let deletedData
        Course.findOne({ where: { id } })
            .then((data) => {
                deletedData = data.dataValues
                return Course.destroy({ where: { id } })
            })
            .then((course) => {
                res.redirect(`/courses?courseName=${deletedData.name}`)
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static detailCourses(req, res) {
        const {id} = req.params
        Course.findOne({where: {id}})
            .then((course) => {
                res.render('./frontend/courses/detailCourse', { course })
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = CoursesController