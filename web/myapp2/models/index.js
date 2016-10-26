"use strict";
let Sequelize = require('sequelize');
let fs        = require("fs");
let path      = require("path");
import User from './User.js';

let obj = null;
let db = {};
module.exports.connection = (host, database, user, pass) => {
  if (obj === null) {
    console.log("New obj");
    let sequelize = new Sequelize(database, user, pass, {
        host: host
      });
    obj = {
      Sequelize: Sequelize,
      sequelize: sequelize,
    };
    // Export all models
    
    fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
      let model = sequelize.import(path.join(__dirname, file));
      db[file.split('.')[0]] = model;
    });
  }

  return obj;
};

module.exports.models = db;