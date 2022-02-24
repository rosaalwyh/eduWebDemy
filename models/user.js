'use strict';
const {
  Model
} = require('sequelize');

const { encrypt } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.DetailUser, { foreignKey: "UserId" })
      User.belongsToMany(models.Course, {  
        through: models.UserCourse
      })
    }
    get age(){
      let currentYear = new Date();
      let foundedDate = this.dateOfBirth.getFullYear();
      return currentYear.getFullYear() - foundedDate;
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: {
          args : true,
          msg : 'Please Enter Username'
        },
        notNull:{
          args: true,
          msg: 'Please Enter Username'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: {
          args : true,
          msg : 'Please Enter Password'
        },
        notNull:{
          args: true,
          msg: 'Please Enter Password'
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty:{
          args: true,
          msg: 'Please Enter Email'
        },
        notNull:{
          args: true,
          msg: 'Please Enter Email'
        }
      }
    },
    role: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty:{
          args: true,
          msg: 'Please Enter Role'
        },
        notNull:{
          args: true,
          msg: 'Please Enter Role'
        }
      }
    }
  }, {
    hooks: {
      afterValidate: (instance, options) => {
        instance.password = encrypt(instance.password)
      },
      beforeValidate: (instance, options) => {
        instance.role = "Student"
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};