'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    static associate(models) {
      UserCourse.hasMany(models.Course, {foreignKey: "CourseId"})
      UserCourse.hasMany(models.User, { foreignKey: "UserId" })
    }
  }
  UserCourse.init({
    CourseId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserCourse',
  });
  return UserCourse;
};