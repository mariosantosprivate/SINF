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
  }
});

module.exports = Invoice;
