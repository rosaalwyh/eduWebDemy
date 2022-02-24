'use strict';
const {
  Model
} = require('sequelize');

const { encrypt } = require("../helpers/bcrypt");


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Course, {  foreignKey: "UserId"})
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
          args: true,
          msg: 'Please Enter Password'
        },
        notNull: {
          args: true,
          msg: 'Please Enter Password'
        },
        len: {
          args: [6,200],
          msg : 'Password length minimum 6'
        },
        isAlphanumeric: {
          args : true,
          msg : 'Must include letters, numbers and symbol'
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
    },
    profilePicture:{
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty:{
          args: true,
          msg: 'Please Enter Image'
        },
        notNull:{
          args: true,
          msg: 'Please Enter Image'
        }
      }
    }, 
    dateOfBirth:{
      type : DataTypes.DATE,
      allowNull: false,
      validate : {
        notEmpty:{
          args: true,
          msg: 'Please Enter Date of Birth'
        },
        notNull:{
          args: true,
          msg: 'Please Enter Date of Birth'
        }
      }
    } 
  }, {
    hooks: {
      afterValidate: (instance, option) => {
        instance.password = encrypt(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};