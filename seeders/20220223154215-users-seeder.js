'use strict';
const fs = require('fs');
let userData = JSON.parse(fs.readFileSync('./data/users.json'))
module.exports = {
  up (queryInterface, Sequelize) {
    userData.forEach(user => {
      delete user.id
      delete user.profilePicture
      delete user.dateOfBirth
      user.createdAt = new Date()
      user.updatedAt = new Date()
    });
   return queryInterface.bulkInsert('Users', userData)
  },

  down (queryInterface, Sequelize) {
    userData.forEach(user => {
      delete user.id
      user.createdAt = new Date()
      user.updatedAt = new Date()
    });
    return queryInterface.bulkDelete('Users', null, {})
  }
};
