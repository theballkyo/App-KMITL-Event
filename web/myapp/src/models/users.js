'use strict';

module.exports = (sequelize, DataTypes) => {
  let users = sequelize.define('users', {
    email: {
      type: DataTypes.STRING(255),
      unique: true
    },
    first_name: DataTypes.STRING(128),
    last_name: DataTypes.STRING(128),
    password: DataTypes.STRING(128),
    role: DataTypes.INTEGER,
    last_login: DataTypes.DATE
  }, {
    classMethods: {
      associate: (models) => {
        users.hasMany(models.events, {
          as: 'Events'
        })
      },
    },
    instanceMethods: {
      is_admin: function() {
        return this.role === 0
      },
    },
    underscored: true
  });

  return users
}