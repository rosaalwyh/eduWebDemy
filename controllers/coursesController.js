const {Course, Category, User, UserCourse} = require('../models');
  
const nodemailer = require('nodemailer') 

class CoursesController {
    
    static getCourses(req, res) {
        let { courseName, sorted, search, duration} = req.query
        let {id, email} = req.session.user
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "abyoso09@gmail.com",
                pass: "ANUBARAK"
            }
        })
        let mailOptions = {
            from: "abyoso09@gmail.com", 
            to: email,
            subject: "Welcome to Our Classs",
            text: `Welcome, Please join us in ${courseName}, 
            class duration will run for ${duration} and will be held in, so dont be late`
        }
        if (duration){
            transporter.sendMail(mailOptions, function(err, success){
                if (err) console.log(err);
                else console.log('email sent');
            })
        }
        let method;
        if (sorted){
            method = sorted
        } else {
            method = search
        }
        Course.filteredCourse(method)
            .then((courses) => {
                res.render('courses/course', {courses, courseName, id})
            })
            .catch((error) => {
                res.send(error)
            })
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
        let data;
        Course.create(newUser)
        .then((course) => {
            data = {
                CourseId : course.id,
                UserId
            }
            return UserCourse.create(data)
        })
        .then(() => {
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
            return UserCourse.findAll({
                include : {
                    model : User
                }
            })
        })
        .then((user) => {
            users = user
            return Course.findOne({
                id : users.UserId
            })
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
        let data;
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