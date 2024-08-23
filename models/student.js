'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       // Many-to-Many: Student belongs to many Classes
      this.belongsToMany(models.Class, {
            through: 'StudentClasses',
            as: 'classes',
            foreignKey: 'studentId'
          });
    }
  }
  Student.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Student',
  });

  // Student.associate = function(models) {
  //   Student.belongsToMany(models.Class, {
  //     through: 'StudentClasses',
  //     as: 'classes',
  //     foreignKey: 'studentId'
  //   });
  // };

  return Student;
};