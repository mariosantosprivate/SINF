const db = require('../db');
const Sequelize = require('sequelize');

const Customer = db.define('Customer', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  companyName: {
    type: Sequelize.STRING,
    field: 'company_name'
  }
});

module.exports = Customer;
