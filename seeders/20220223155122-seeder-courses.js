'use strict';
const fs = require('fs');
let courseData = JSON.parse(fs.readFileSync('./data/courses.json'))
module.exports = {
  up (queryInterface, Sequelize) {
    courseData.forEach(course => {
      delete course.id
      course.createdAt = new Date()
      course.updatedAt = new Date()
      course.CategoryId = course.categoryId
      delete course.categoryId
      delete course.userId
    });
    return queryInterface.bulkInsert('Courses', courseData)
  },

  down (queryInterface, Sequelize) {
     courseData.forEach(course => {
      delete course.id
      course.createdAt = new Date()
      course.updatedAt = new Date()
      course.CategoryId = course.categoryId
      delete course.categoryId
      delete course.userId
    });
    return queryInterface.bulkDelete('Courses', null)
  }
};
