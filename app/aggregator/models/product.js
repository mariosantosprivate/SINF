let db = require('../db');
let Sequelize = require('sequelize');

let Product = db.define('Product', {
  code: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  description: {
    type: Sequelize.STRING
  },
  group: {
    type: Sequelize.STRING
  },
  numberCode: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  }
});

module.exports = Product;