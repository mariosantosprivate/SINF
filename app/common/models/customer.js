const Sequelize = require('sequelize');
const db = require('../db');

const Customer = db.define('Customer', {
  customerId: {
    type: Sequelize.STRING,
    primaryKey: true,
    field: 'customer_id',
  },
  companyName: {
    type: Sequelize.STRING,
    field: 'company_name',
  },
});

module.exports = Customer;
