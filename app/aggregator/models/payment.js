const db = require('../db');
const Sequelize = require('sequelize');

const Payment = db.define('Payment', {
  paymentRefNo: {
    type: Sequelize.STRING,
    primaryKey: true,
    field: 'payment_ref_no'
  },
  paymentType: {
    type: Sequelize.STRING,
    field: 'payment_type'
  }
});

module.exports = Payment;
