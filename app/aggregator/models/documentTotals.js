const db = require('../db');
const Sequelize = require('sequelize');

const DocumentTotals = db.define('DocumentTotals', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  taxPayable: {
    type: Sequelize.DECIMAL,
    field: 'tax_payable'
  },
  netTotal: {
    type: Sequelize.DECIMAL,
    field: 'net_total'
  },
  grossTotal: {
    type: Sequelize.DECIMAL,
    field: 'gross_total'
  },
  currency: {
    type: Sequelize.STRING
  }
});

module.exports = DocumentTotals;
