let db = require('../db');
let Sequelize = require('sequelize');

let Tax = db.define('Tax', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  type: {
    type: Sequelize.STRING
  },
  countryRegion: {
    type: Sequelize.STRING
  },
  code: {
    type: Sequelize.STRING
  },
  percentage: {
    type: Sequelize.DECIMAL
  }
});

module.exports = Tax;