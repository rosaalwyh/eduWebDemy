const {Course, Category, User} = require('../models');
 
const { Op } = require('sequelize'); 

class CoursesController {

    static getCourses(req, res) {
        let { courseName, sorted, search} = req.query
        if (sorted){
            Course.findAll({ 
                include: [
                    { model: Category },
                    { model: User}
                ],
                order: [[
                    sorted,'ASC'
                ]]
            })
            .then((courses) => {
                res.render('./courses/course', { courses, courseName })
            })
            .catch((err) => {
                res.send(err)
            })
        } else if (search){
            let formatedKey = search.toLowerCase();
            Course.findAll({
                include: [
                    { model: Category },
                    { model: User}
                ],
                where: {
                    name: {
                        [Op.iLike]: `%${formatedKey}%`
                    }
                }
            })
            .then((courses) => {
                res.render('./courses/course', { courses, courseName })
            })
            .catch((err) => {
                res.send(err)
            })
        } else {
            Course.findAll({ 
                include: [
                    { model: Category },
                    { model: User}
                ]
            })
            .then((courses) => {
                res.render('./courses/course', { courses, courseName })
            })
            .catch((err) => {
                res.send(err)
            })
        }
    }

    static addCourses(req, res) {
        let {errMsg} = req.query
        let category
        Category.findAll()
        .then((categories) => {
            category = categories
            return User.findAll()
        })
        .then((users) => {
            if(!errMsg){
                res.render('./courses/addCourse', {category, users, errMsg})
            } else {
                errMsg = errMsg.split(',')
                res.render('./courses/addCourse', {category, users, errMsg})
            }
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static createCourses(req, res) {
        let {name, description, duration, CategoryId, UserId} = req.body
        let newUser = {name, description, duration, CategoryId, UserId}
        Course.create(newUser)
        .then((course) => {
            res.redirect('/courses')
        })
        .catch((err) => {
            let errMsg = err.errors.map((errEl) => errEl.message)
            res.redirect(`/courses/add?errMsg=${errMsg}`)
        })
    }

    static editCourses(req, res) {
        let {id} = req.params
        let { errMsg } = req.query
        let category
        let users
        Category.findAll()
        .then((categories) => {
            category = categories
            return User.findAll()
        })
        .then((user) => {
            users = user
            return Course.findByPk(id)
        })
        .then((course) => {
            res.render('./courses/editCourse', {course, users ,category, errMsg})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static updateCourses(req, res) {
        let {id} = req.params
        let { name, description, duration, CategoryId, UserId } = req.body
        let editedCourse = { name, description, duration, CategoryId, UserId }
        Course.update((editedCourse), {where: {id}})
        .then((course) => {
            res.redirect('/courses')
        })
        .catch((err) => {
            let errMsg = err.errors.map((errEl) => errEl.message)
            res.redirect(`/courses/edit/${id}?errMsg=${errMsg}`)
        })
    }

    static deleteCourses(req, res) {
        let {id} = req.params
        let deletedData
        Course.findOne( { where: {id} } )
        .then((data) => {
            deletedData = data.dataValues
            return Course.destroy( { where: {id} } )
        })
        .then((course) => {
            res.redirect(`/courses?courseName=${deletedData.name}`)
        })
        .catch((err) => {
            res.send(err)
        })
    }

}

module.exports = CoursesController