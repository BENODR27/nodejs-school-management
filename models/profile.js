'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Teacher, {
        foreignKey: 'teacherId',
        as: 'teacher'
      });
    }
  }
  Profile.init({
    bio: DataTypes.STRING,
    teacherId: {
      type: DataTypes.DATE,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  Profile.associate = function(models) {
    // One-to-One: Profile belongs to one Teacher
    Profile.belongsTo(models.Teacher, {
      foreignKey: 'teacherId',
      as: 'teacher'
    });
  };
  return Profile;
};