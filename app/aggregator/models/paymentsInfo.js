const db = require('../db');
const Sequelize = require('sequelize');

const PaymentsInfo = db.define('PaymentsInfo', {
  fiscalYear: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    field: 'fiscal_year'
  },
  numberOfEntries: {
    type: Sequelize.BIGINT,
    field: 'number_of_entries'
  },
  totalDebit: {
    type: Sequelize.DECIMAL,
    field: 'total_debit'
  },
  totalCredit: {
    type: Sequelize.DECIMAL,
    field: 'total_credit'
  }
}, { tableName: 'PaymentsInfo' });

module.exports = PaymentsInfo;
