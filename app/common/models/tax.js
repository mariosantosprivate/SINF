const Sequelize = require('sequelize');
const db = require('../db');

const Tax = db.define('Tax', {
  type: {
    type: Sequelize.STRING,
    field: 'type',
  },
  countryRegion: {
    type: Sequelize.STRING,
    field: 'country_region',
  },
  code: {
    type: Sequelize.STRING,
    field: 'code',
  },
  description: {
    type: Sequelize.STRING,
    field: 'description',
  },
  percentage: {
    type: Sequelize.DECIMAL,
    field: 'percentage',
  },
});

module.exports = Tax;
