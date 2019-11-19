const db = require('../db');
const Sequelize = require('sequelize');

const InvoiceLine = db.define('InvoiceLine', {
  lineNumber: {
    type: Sequelize.BIGINT,
    field: 'line_number'
  },
  quantity: {
    type: Sequelize.DECIMAL
  },
  unitOfMeasure: {
    type: Sequelize.STRING,
    field: 'unit_of_measure'
  },
  unitPrice: {
    type: Sequelize.DECIMAL,
    field: 'unit_price'
  },
  description: {
    type: Sequelize.STRING
  },
  creditAmount: {
    type: Sequelize.DECIMAL,
    field: 'credit_amount'
  },
  debitAmount: {
    type: Sequelize.DECIMAL,
    field: 'debit_amount'
  },
  settlementAmount: {
    type: Sequelize.DECIMAL,
    field: 'settlement_amount'
  }
});

module.exports = InvoiceLine;
