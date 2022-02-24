'use strict';
const fs = require('fs');
let userCourses = JSON.parse(fs.readFileSync('./data/usercourses.json'))
module.exports = {
  up (queryInterface, Sequelize) {
    userCourses.forEach(user => {
      user.createdAt = new Date()
      user.updatedAt = new Date()
    });
    return queryInterface.bulkInsert('UserCourses',userCourses)
  },

  down (queryInterface, Sequelize) {
     userCourses.forEach(user => {
      user.createdAt = new Date()
      user.updatedAt = new Date()
    });
    return queryInterface.bulkDelete('UserCourses',null)
  }
};
