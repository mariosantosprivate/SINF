let db = require('../db');
let Sequelize = require('sequelize');

let Product = db.define('Product', {
  code: {
    type: Sequelize.STRING,
    unique: true,
    field: 'code'
  },
  description: {
    type: Sequelize.STRING,
    field: 'description'
  },
  group: {
    type: Sequelize.STRING,
    field: 'group'
  },
  numberCode: {
    type: Sequelize.STRING,
    field: 'number_code'
  },
  type: {
    type: Sequelize.STRING,
    field: 'type'
  }
});

module.exports = Product;