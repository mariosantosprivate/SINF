const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('Product', {
  code: {
    type: Sequelize.STRING,
    primaryKey: true,
    field: 'product_code',
  },
  description: {
    type: Sequelize.STRING,
    field: 'description',
  },
  group: {
    type: Sequelize.STRING,
    field: 'group',
  },
  numberCode: {
    type: Sequelize.STRING,
    field: 'number_code',
  },
  type: {
    type: Sequelize.STRING,
    field: 'type',
  },
});

module.exports = Product;
