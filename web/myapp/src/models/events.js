"use strict";

module.exports = (sequelize, DataTypes) => {
  let events = sequelize.define('events', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    location: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING(24),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isFloat: true,
        max: 100000000,
        min: 0
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        events.belongsTo(models.users, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          },
          as: 'User'
        })
        events.belongsToMany(models.tags, {
          through: 'events_tags',
          as: 'tags'
        })
      }
    },
    underscored: true,
    validate: {
      checkUndefined: function() {
        if ((this.latitude === null) !== (this.longitude === null)) {
          throw new Error('Require either both latitude and longitude or neither')
        }
      }
    }
  });

  return events
}