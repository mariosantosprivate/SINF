const db = require('../db');
const Sequelize = require('sequelize');

const Invoice = db.define('Invoice', {
  invoiceNo: {
    type: Sequelize.STRING,
    primaryKey: true,
    field: 'invoice_no'
  },
  invoiceDate: {
    type: Sequelize.DATEONLY,
    field: 'invoice_date'
  },
  // Document Totals
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
  }
});

module.exports = Invoice;
