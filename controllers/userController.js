const {User} = require('../models/index')

class UserController {
    static getUser(req, res) {
        User.findAll()
        .then(dataUser => {
            res.render('users/showUser', {dataUser})
        })
        .catch(err => {
            res.send(err)
        })
    }
    static addUser(req, res) {
        const msg = req.query.error
        res.render('users/addFormUser', {msg})
    }

    static createUser(req, res) {
        const {username, password, email, role, profilePicture, dateOfBirth} = req.body
        User.create({ username, password, email, role, profilePicture, dateOfBirth })
        .then(() => {
            res.redirect(`/user`)
        })
        .catch(err => {
            let result = err.errors.map(el => el.message)
            res.redirect(`/user/add?error=${result}`)
        })
    }

    static editUser(req, res) {
        const id = req.params.id
        const msg = req.query.error
        User.findByPk(id)
        .then(userEdit => {
            res.render('users/editFormUser', { userEdit, msg })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static updateUser(req, res) {
        const id = req.params.id
        const {username, password, email, role, profilePicture, dateOfBirth} = req.body
        User.update({username, password, email, role, profilePicture, dateOfBirth}, {
            where : {
                id,
            }
        })
        .then(() => {
            res.redirect(`/user`)
        })
        .catch(err => {
            let result = err.errors.map(el => el.message)
            res.redirect(`/user/edit/${id}?error=${result}`)
        })
    }
    static deleteUser(req, res) {
        const id = req.params.id
        User.destroy({
            where: {
                id
            }
        })
        .then(() =>{
            res.redirect('/user')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = UserController