'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Course, {foreignKey: "CategoryId"})
    }
  }
  Category.init({
    name: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty:{
          args: true,
          msg: 'Please Enter Category Name'
        },
        notNull:{
          args: true,
          msg: 'Please Enter Category Name'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};