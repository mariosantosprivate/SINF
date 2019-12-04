const Sequelize = require('sequelize');
const db = require('../db');

const SalesInvoice = db.define('SalesInvoice', {
  fiscalYear: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    field: 'fiscal_year',
  },
  numberOfEntries: {
    type: Sequelize.BIGINT,
    field: 'number_of_entries',
  },
  totalDebit: {
    type: Sequelize.DECIMAL,
    field: 'total_debit',
  },
  totalCredit: {
    type: Sequelize.DECIMAL,
    field: 'total_credit',
  },
});

module.exports = SalesInvoice;
