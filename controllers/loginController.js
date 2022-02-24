const { User } = require('../models');
class LoginController {

    static formRegistration(req, res) {
        let { errMsg } = req.query
        if(!errMsg){
            res.render('./auth/registration')
        } else {
            errMsg = errMsg.split(',')
            res.render('./auth/registration', {errMsg})
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
        res.render('./auth/login')
    }

    static login(req, res) {
        let { username, password } = req.body
        User.findOne({ where: { username } })
            .then((user) => {
                if(!user){
                    const errMsg = 'Invalid username/password!'
                    res.redirect(`/login?errMsg=${errMsg}`)
                } else {
                    const isValidAuth = bcrypt.compareSync(password, user.password);
                    if(isValidAuth){
                        res.redirect('/')
                    } else {
                        const errMsg = 'Invalid username/password!'
                        res.redirect(`/login?errMsg=${errMsg}`)
                    }
                }
            })
    }

}

module.exports = LoginController