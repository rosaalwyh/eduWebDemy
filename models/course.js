'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.Category, {foreignKey: 'CategoryId'})
      Course.belongsToMany(models.User, {  
        through: models.UserCourse
      })
    }
  }
  Course.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: 'Name is required'
        },
        notNull:{
          msg: 'Name is required'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: 'Description is required'
        },
        notNull:{
          msg: 'Description is required'
        }
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: 'Duration is required'
        },
        notNull:{
          msg: 'Duration is required'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: 'Category is required'
        },
        notNull:{
          msg: 'Category is required'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};