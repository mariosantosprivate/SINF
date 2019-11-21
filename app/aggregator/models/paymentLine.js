const db = require('../db');
const Sequelize = require('sequelize');

const PaymentLine = db.define('PaymentLine', {
  lineNumber: {
    type: Sequelize.BIGINT,
    field: 'line_number'
  },
  debitAmount: {
    type: Sequelize.DECIMAL,
    field: 'debit_amount'
  },
  credtiAmount: {
    type: Sequelize.DECIMAL,
    field: 'credit_amount'
  }
});

module.exports = PaymentLine;
