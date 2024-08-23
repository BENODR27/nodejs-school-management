'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // One-to-One: Teacher has one Profile
      this.hasOne(models.Profile, {
        foreignKey: 'teacherId',
        as: 'profile'
      });
        // One-to-Many: Teacher has many Classes
      this.hasMany(models.Class, {
        foreignKey: 'teacherId',
        as: 'classes'
      });
    }
  }
  Teacher.init({
    name: DataTypes.STRING,
    subject:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'subject cannot be empty' },
        len: { args: [3, 50], msg: 'subject must be between 3 and 50 characters' }
      }
    }
  }, {
    sequelize,
    modelName: 'Teacher',
  });

  // Teacher.associate = function(models) {
  //   Teacher.hasMany(models.Class, {
  //     foreignKey: 'teacherId',
  //     as: 'classes'
  //   });
  // One-to-One: Teacher has one Profile
//   Teacher.hasOne(models.Profile, {
//     foreignKey: 'teacherId',
//     as: 'profile'
//   });
// }
 

  return Teacher;
};