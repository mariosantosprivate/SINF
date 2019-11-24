const db = require('../db');
const Sequelize = require('sequelize');

const Customer = db.define('Customer', {
  customerId: {
    type: Sequelize.STRING,
    unique: true,
    field: 'customer_id'
  },
  companyName: {
    type: Sequelize.STRING,
    field: 'company_name'
  }
});

module.exports = Customer;
