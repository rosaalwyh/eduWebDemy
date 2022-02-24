'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailUser extends Model {
    static associate(models) {
      DetailUser.hasOne(models.User, { foreignKey: "UserId" })
    }
  }
  DetailUser.init({
    fullName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    profilePicture: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DetailUser',
  });
  return DetailUser;
};