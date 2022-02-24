const {DetailUser, User} = require('../models/index')

class DetailUserController {
    static getdetailUser(req, res) {
        const id = req.params.id
        if (id){
            DetailUser.findByPk(id)
            .then(dataDetail => {
                console.log(id);
                res.render('detailUsers/showDetailUser', {dataDetail, id})
            })
            .catch(err => {
                res.send(err)
            })
        } else {
            DetailUser.findAll()
            .then(dataDetail => {
                res.render('detailUsers/showDetailUser', {dataDetail, id})
            })
            .catch(err => {
                res.send(err)
            })    
        }
    }

    static addDetailUser(req, res) {
        const msg = req.query.error
        res.render('detailUsers/addFormDetailUser', {msg})
    }

    static createDetailUser(req, res) {
        const {fullName, dateOfBirth, profilePicture, address, phoneNumber} = req.body
        DetailUser.create({ fullName, dateOfBirth, profilePicture, address, phoneNumber })
        .then(() => {
            res.redirect(`/detailUser`)
        })
        .catch(err => {
            let result = err.errors.map(el => el.message)
            res.redirect(`/detailUser/add?error=${result}`)
        })
    }
    static editDetailUser(req, res) {
        const id = req.params.id
        const msg = req.query.error
        DetailUser.findByPk(id)
        .then(detailEdit => {
            res.render('detailUsers/editFormDetailUser', { detailEdit, msg })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static updateDetailUser(req, res) {
        const id = req.params.id
        const {fullName, dateOfBirth, profilePicture, address, phoneNumber} = req.body
        DetailUser.update({fullName, dateOfBirth, profilePicture, address, phoneNumber}, {
            where : {
                id,
            }
        })
        .then(() => {
            res.redirect(`/detailUser`)
        })
        .catch(err => {
            let result = err.errors.map(el => el.message)
            res.redirect(`/detailUser/edit/${id}?error=${result}`)
        })
    }

    static deleteDetailUser(req, res) {
        const id = req.params.id
        DetailUser.destroy({
            where: {
                id
            }
        })
        .then(() =>{
            res.redirect('/detailUser')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = DetailUserController