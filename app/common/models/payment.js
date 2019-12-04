const Sequelize = require('sequelize');
const db = require('../db');

const Payment = db.define('Payment', {
  paymentRefNo: {
    type: Sequelize.STRING,
    primaryKey: true,
    field: 'payment_ref_no',
  },
  paymentType: {
    type: Sequelize.STRING,
    field: 'payment_type',
  },
  // Document Totals
  taxPayable: {
    type: Sequelize.DECIMAL,
    field: 'tax_payable',
  },
  netTotal: {
    type: Sequelize.DECIMAL,
    field: 'net_total',
  },
  grossTotal: {
    type: Sequelize.DECIMAL,
    field: 'gross_total',
  },
  currency: {
    type: Sequelize.STRING,
  },
});

module.exports = Payment;
