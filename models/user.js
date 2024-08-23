const { Model, DataTypes } = require('sequelize');
const argon2 = require('argon2');
module.exports = (sequelize, DataTypes) => {

class User extends Model {
  // Method to check password
  async comparePassword(password) {
    return await argon2.verify(this.password, password);
  }
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'Username cannot be empty' },
      len: { args: [3, 50], msg: 'Username must be between 3 and 50 characters' }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: 'Must be a valid email address' }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: { args: [6, 100], msg: 'Password must be between 6 and 100 characters' }
    }
  }
}, {
  sequelize,
  modelName: 'User',
  hooks: {
    beforeSave: async (user, options) => {
      if (user.changed('password')) {
        user.password = await argon2.hash(user.password);
      }
    }
  }
});

return User;
}