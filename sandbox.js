// npx sequelize-cli model:generate --name Category --attributes name:string
// npx sequelize-cli model:generate --name User --attributes username:string,password:string,email:string,role:string,role:string,profilePicture:string,dateOfBirth:date
// npx sequelize-cli model:generate --name Courses --attributes name:string,description:text,duration:integer,CategoryId:integer,UserId:integer
// npx sequelize-cli seed:generate --name userCourses-seeder

// npx sequelize-cli model:generate --name DetailUser --attributes fullName:string,dateOfBirth:date,profilePicture:string,address:string,phoneNumber:string,UserId:integer

// npx sequelize-cli model:generate --name UserCourse --attributes CourseId:integer,UserId:integer