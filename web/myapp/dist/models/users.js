"use strict";

module.exports = function (sequelize, DataTypes) {
   return sequelize.define('tests', {
      title: DataTypes.STRING,
      description: DataTypes.TEXT
   });
};