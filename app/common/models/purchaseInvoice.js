const db = require('../db');
const Sequelize = require('sequelize');

const PurchaseInvoice = db.define('PurchaseInvoice', {
  fiscalYear: {
    type: Sequelize.INTEGER,
    field: 'fiscal_year'
  },
  documentDate: {
    type: Sequelize.DATE,
    field: 'document_date'
  },
  grossValueAmount: {
    type: Sequelize.DECIMAL,
    field: 'gross_value_amount'
  },
  allowanceChargeAmount: {
    type: Sequelize.DECIMAL,
    field: 'allowance_charge_amount'
  },
  taxExclusiveAmount: {
    type: Sequelize.DECIMAL,
    field: 'tax_exclusive_amount'
  },
  taxTotalAmount: {
    type: Sequelize.DECIMAL,
    field: 'tax_total_amount'
  },
  payableAmount: {
    type: Sequelize.DECIMAL,
    field: 'payable_amount'
  },
  wTaxTotalAmount: {
    type: Sequelize.DECIMAL,
    field: 'w_tax_total_amount'
  },
  totalLiabilityAmount: {
    type: Sequelize.DECIMAL,
    field: 'total_liability_amount'
  },
  discountInValueAmount: {
    type: Sequelize.DECIMAL,
    field: 'discount_in_value_amount'
  },
});

module.exports = PurchaseInvoice;
