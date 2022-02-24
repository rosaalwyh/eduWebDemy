const express = require('express')
const router = require('./routes');
const session = require('express-session')
const app = express()
const port = 3003
const path = require('path')

const multer = require('multer');
const res = require('express/lib/response');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer ({storage: storage})
app.get('/upload', (req,res) => {
    res.render('upload')
})

app.post('/upload', upload.single('image'), (req,res) => {
    res.send('uploaded')
})

// app.set('view engine', 'ejs');
// app.use(express.urlencoded({ extended: true }));
// app.use(session({
//   secret: 'gabolehtau',//harus ada
//   resave: false,
//   saveUninitialized: false,
//   cookie: { 
//     secure: false,
//     sameSite: true //utk security csrf attack
//   }
// }))


// app.use(router);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port} http://localhost:3000/`)
// })