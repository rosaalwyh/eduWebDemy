'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailUser extends Model {
    static associate(models) {
      DetailUser.belongsTo(models.User, { foreignKey: "UserId" })
    }
    get age(){
      let currentYear = new Date();
      let foundedDate = this.dateOfBirth.getFullYear();
      return currentYear.getFullYear() - foundedDate;
    }
  }
  DetailUser.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: {
          args : true,
          msg : 'Please Enter FullName'
        },
        notNull:{
          args: true,
          msg: 'Please Enter FullName'
        }
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate : {
        notEmpty: {
          args : true,
          msg : 'Please Enter Date of Birth'
        },
        notNull:{
          args: true,
          msg: 'Please Enter Date of Birth'
        }
      }
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: {
          args : true,
          msg : 'Please Enter Profile Pictures'
        },
        notNull:{
          args: true,
          msg: 'Please Enter Profile Pictures'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: {
          args : true,
          msg : 'Please Enter Address'
        },
        notNull:{
          args: true,
          msg: 'Please Enter Address'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: {
          args : true,
          msg : 'Please Enter Phone Number'
        },
        notNull:{
          args: true,
          msg: 'Please Enter Phone Number'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DetailUser',
  });
  return DetailUser;
};