const Sequelize = require('sequelize');
const db = require('../db');

const HeaderData = db.define('HeaderData', {
  fiscalYear: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    field: 'fiscal_year',
  },
  companyName: {
    type: Sequelize.STRING,
    field: 'company_name',
  },
  startDate: {
    type: Sequelize.DATEONLY,
    field: 'start_date',
  },
  endDate: {
    type: Sequelize.DATEONLY,
    field: 'end_date',
  },
  currencyCode: {
    type: Sequelize.STRING,
    field: 'currency_code',
  },
});

module.exports = HeaderData;
