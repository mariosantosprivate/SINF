const Sequelize = require('sequelize');
const db = require('../db');

const PurchaseInvoiceLine = db.define('PurchaseInvoiceLine', {
  grossValueAmount: {
    type: Sequelize.DECIMAL,
    field: 'gross_value_amount',
  },
});

module.exports = PurchaseInvoiceLine;
