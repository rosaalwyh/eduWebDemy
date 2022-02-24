const { User } = require('../models');
const { compare } = require("../helpers/bcrypt");
class LoginController {

    static formRegistration(req, res) {
        let { errMsg } = req.query
        if(!errMsg){
            res.render('./auth/registration', { errMsg })
        } else {
            errMsg = errMsg.split(',')
            res.render('./auth/registration', { errMsg })
        }
    }

    static registration(req, res) {
        let { username, email, password } = req.body
        let newUser = { username, email, password }
        User.create(newUser, {returning:false} )
        .then((user) => {
            res.redirect('/login')
        })
        .catch((err) => {
            let errMsg = err.errors.map((erEl) => erEl.message)
            res.redirect(`/registration?errMsg=${errMsg}`)
        })
    }

    static formLogin(req, res) {
        let {errMsg} = req.query
        if(!errMsg){
            res.render('./auth/login', { errMsg })
        } else if (!Array.isArray(errMsg)) {
            res.render('./auth/login', { errMsg })
        } else {
            errMsg = errMsg.split(',')
            res.render('./auth/login', {errMsg})
        }
    }

    static login(req, res) {
        let { username, password } = req.body
        User.findOne({ where: { username } })
            .then((user) => {
                if(!user){
                    const errMsg = 'Invalid username/password!'
                    return res.redirect(`/login?errMsg=${errMsg}`)
                } else {
                    //case berhasil
                    req.session.user =  {id: user.id, role:user.role} //set session di controller login
                    const isValidAuth = compare(password, user.password);
                    if(isValidAuth){
                        return res.redirect('/')
                    } else {
                        const errMsg = 'Invalid username/password!'
                        return res.redirect(`/login?errMsg=${errMsg}`)
                    }
                }
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static logout(req, res){
        req.session.destroy((err) => {
            if(err){
                res.send(err)
            } else {
                res.redirect('/login')
            }
        })
    }

}

module.exports = LoginController