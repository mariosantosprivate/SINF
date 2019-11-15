let db = require('../db');
let Sequelize = require('sequelize');

let HeaderData = db.define('HeaderData', {
  fiscalYear: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  companyName: {
    type: Sequelize.STRING
  },
  startDate: {
    type: Sequelize.DATE
  },
  endDate: {
    type: Sequelize.DATE
  },
  currencyCode: {
    type: Sequelize.STRING
  }
});

module.exports = HeaderData;