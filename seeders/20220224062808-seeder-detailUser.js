'use strict';

const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let dataDetail = JSON.parse(fs.readFileSync('./data/detailUsers.json'))
     dataDetail = dataDetail.map(el => {
       delete el.id
       el.createdAt = new Date()
       el.updatedAt = new Date()
       return el
     })
     return queryInterface.bulkInsert('DetailUsers', dataDetail, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     queryInterface.bulkDelete('DetailUsers', null, {});
  }
};
