const isLogin = function(req, res, next) {
    if(!req.session.user || !req.session.user.id){
        const errMsg = `You must login first!`
        res.redirect(`/login?errMsg=${errMsg}`)
    } else {
        next()
    }
}

const isAdmin = function(req, res, next) {
    if(req.session.user.role !== "Admin"){
        const errMsg = `Sorry, this page only allow for admin!`
        res.redirect(`/login?errMsg=${errMsg}`)
    } else {
        next()
    }
}

const isAdminTeacher = function(req, res, next) {
    if(req.session.user.role === "Admin" || req.session.user.role === "Teacher"){
        next()
    } else {
        const errMsg = `Sorry, this page only allow for admin dan teacher!`
        res.redirect(`/login?errMsg=${errMsg}`)
    }
}

const isStudent = function(req, res, next) {
    if(req.session.user.role !== "Student"){
        const errMsg = `Sorry, this page only allow for Student!`
        res.redirect(`/login?errMsg=${errMsg}`)
    } else {
        next()
    }
}

const isTeacher = function(req, res, next) {
    if(req.session.user.role !== "Teacher"){
        const errMsg = `Sorry, this page only allow for Teacher!`
        res.redirect(`/login?errMsg=${errMsg}`)
    } else {
        next()
    }
}
module.exports = { isLogin, isAdmin, isStudent, isTeacher, isAdminTeacher}