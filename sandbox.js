const {Course, Category, User, UserCourse} = require('./models');
const sequelize = require('sequelize')

console.log(sequelize.UserCourse);
class Test {
    // static editCourses(req, res) {
    //     let {id} = req.params
    //     let { errMsg } = req.query
    //     let category
    //     let users
    //     Category.findAll()
    //     .then((categories) => {
    //         category = categories
    //         return User.findAll()
    //     })
    //     .then((user) => {
    //         users = user
    //         return Course.findByPk(id)
    //     })
    //     .then((course) => {
    //         res.render('./courses/editCourse', {course, users ,category, errMsg})
    //     })
    //     .catch((err) => {
    //         res.send(err)
    //     })
    // }
    static updateCourses(req, res) {
        let {id} = req.params
        let { name, description, duration, CategoryId, UserId } = req.body
        let editedCourse = { name, description, duration, CategoryId, UserId }
        let data;
        Course.update((editedCourse), {where: {id}})
        .then((course) => {
            data = {
                CourseId : course.id,
                UserId
            }
            return UserCourse.update((data), {where: {id}})
        })
        .then(() => {
            res.redirect('/courses')
        })
        .catch((err) => {
            console.log(err);
            let errMsg = err.errors.map((errEl) => errEl.message)
            res.redirect(`/courses/edit/${id}?errMsg=${errMsg}`)
        })
    }
}
