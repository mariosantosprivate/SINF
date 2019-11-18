const db = require('../db');
const Sequelize = require('sequelize');

const HeaderData = db.define('HeaderData', {
  fiscalYear: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    field: 'fiscal_year'
  },
  companyName: {
    type: Sequelize.STRING,
    field: 'company_name'
  },
  startDate: {
    type: Sequelize.DATE,
    field: 'start_date'
  },
  endDate: {
    type: Sequelize.DATE,
    field: 'end_date'
  },
  currencyCode: {
    type: Sequelize.STRING,
    field: 'currency_code'
  }
});

module.exports = HeaderData;