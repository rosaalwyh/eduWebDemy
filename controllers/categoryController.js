const {Category} = require('../models/index')
class CategoryController {

    static getCategory(req, res) {
        Category.findAll()
        .then(dataCategory => {
            res.render('categories/showCategory', {dataCategory})
        })
    }
    static addCategory(req, res) {
        const msg = req.query.error
        res.render('categories/addForm', {msg})
    }

    static createCategory(req, res) {
        const { name } = req.body
        Category.create({ name })
        .then(() => {
            res.redirect(`/category`)
        })
        .catch(err => {
            let result = err.errors.map(el => el.message)
            res.redirect(`/category/add?error=${result}`)
        })
    }

    static editCategory(req, res) {
        const id = req.params.id
        const msg = req.query.error
        Category.findByPk(id)
        .then(categoryEdit => {
            res.render('categories/editForm', { categoryEdit, msg })
        })
        .catch(err => {
            res.send(err)
        })

    }

    static updateCategory(req, res) {
        const id = req.params.id
        const {name} = req.body
        Category.update({name}, {
            where : {
                id,
            }
        })
        .then(() => {
            res.redirect(`/category`)
        })
        .catch(err => {
            let result = err.errors.map(el => el.message)
            res.redirect(`/category/edit/${id}?error=${result}`)
        })
    }
    static deleteCategory(req, res) {
        const id = req.params.id

        Category.destroy({
            where: {
                id
            }
        })
        .then(() =>{
            res.redirect('/category')
        })
        .catch(err => {
            res.send(err)
        })
    }

}

module.exports = CategoryController