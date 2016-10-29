module.exports = (sequelize, Sequelize) => {
  return sequelize.define('users', {
    email: {
      type: Sequelize.STRING(128),
    },
    firstName: {
      type: Sequelize.STRING,
      field: 'first_name'
    },
    lastName: {
      type: Sequelize.STRING,
      field: 'last_name'
    },
    password: {
      type: Sequelize.STRING(128),
      field: 'password'
    },
    role: {
      type: Sequelize.INTEGER,
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  });
};