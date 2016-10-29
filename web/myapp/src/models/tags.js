"use strict";

module.exports = (sequelize, DataTypes) => {
  let tags = sequelize.define('tags', {
    name: DataTypes.STRING,
    tag_type: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    classMethods: {
      associate: (models) => {
        tags.belongsToMany(models.events, {
          through: 'events_tags',
          as: 'events'
        })
      }
    },
    underscored: true
  });

  return tags
}