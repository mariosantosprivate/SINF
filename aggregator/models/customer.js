let db = require('../db');
let Sequelize = require('sequelize');

let Customer = db.define('Customer', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  companyName: {
    type: Sequelize.STRING
  }
});

module.exports = Customer;
