// npx sequelize-cli model:generate --name Category --attributes name:string
// npx sequelize-cli model:generate --name User --attributes username:string,password:string,email:string,role:string,role:string,profilePicture:string,dateOfBirth:date
// npx sequelize-cli model:generate --name Courses --attributes name:string,description:text,duration:integer,CategoryId:integer,UserId:integer
// npx sequelize-cli model:generate --name Category --attributes name:string
// npx sequelize-cli seed:generate --name users-seeder

// npx sequelize-cli model:generate --name DetailUser --attributes fullName:string,dateOfBirth:date,profilePicture:string,address:string,phoneNumber:string,UserId:integer
const express = require('express')
const app = express()
const port = 3000

const router = require('./routes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port} http://localhost:3000/`)
})