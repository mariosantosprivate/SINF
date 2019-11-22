const db = require('../db');
const Sequelize = require('sequelize');

const PaymentLine = db.define('PaymentLine', {
  lineNumber: {
    type: Sequelize.BIGINT,
    field: 'line_number'
  },
  type: {
    type: Sequelize.ENUM('credit', 'debit')
  },
  amount: {
    type: Sequelize.DECIMAL,
    field: 'credit_amount'
  }
});

module.exports = PaymentLine;
