const express = require('express')
const router = require('./routes');
const session = require('express-session')
const app = express()
const multer = require('multer');
const port = 3000

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'gabolehtau',//harus ada
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true //utk security csrf attack
  }
}))

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port} http://localhost:3000/`)
})