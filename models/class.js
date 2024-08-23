'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Many-to-One: Class belongs to one Teacher
      this.belongsTo(models.Teacher, {
        foreignKey: 'teacherId',
        as: 'teacher'
      });
      
       // Many-to-Many: Class has many Students
      this.belongsToMany(models.Student, {
        through: 'StudentClasses',
        as: 'students',
        foreignKey: 'classId'
      });
    }
  }
  Class.init({
    name: DataTypes.STRING,
    teacherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Class',
  });

  //another method
  // Class.associate = function(models) {
  //   Class.belongsTo(models.Teacher, {
  //     foreignKey: 'teacherId',
  //     as: 'teacher'
  //   });
  //   Class.belongsToMany(models.Student, {
  //     through: 'StudentClasses',
  //     as: 'students',
  //     foreignKey: 'classId'
  //   });
  // };

  return Class;
};