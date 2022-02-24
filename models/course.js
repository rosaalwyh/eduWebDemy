'use strict';
const {
  Model
} = require('sequelize');

const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.Category, { foreignKey: 'CategoryId' })
      Course.belongsToMany(models.User, {
        through: models.UserCourse
      })
    }

    static filteredCourse(method) {
      let options = {
        include: [
          {
            model: sequelize.models.Category,
          },
          {
            model: sequelize.models.User
          }
        ]
      }
      if (method) {
        if (method === 'ASC') {
          options = {
            include: [
              {
                model: sequelize.models.Category,
              },
              {
                model: sequelize.models.User
              }
            ],
            order: [[method, 'DESC']]
          }
        } else {
          const formatedKey = method.toLowerCase();
          options = {
            include: [
              {
                model: sequelize.models.Category,
              },
              {
                model: sequelize.models.User
              }
            ],
            where: {
              name: {
                [Op.iLike]: `%${formatedKey}%`
              }
            }
          }
        }
      }
      return Course.findAll(options)
    }
  }
  Course.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name is required'
        },
        notNull: {
          msg: 'Name is required'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description is required'
        },
        notNull: {
          msg: 'Description is required'
        }
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Duration is required'
        },
        notNull: {
          msg: 'Duration is required'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Category is required'
        },
        notNull: {
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