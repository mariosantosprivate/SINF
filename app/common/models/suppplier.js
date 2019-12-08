const Sequelize = require('sequelize');
const db = require('../db');

const Supplier = db.define('Supplier', {
  supplierId: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  supplierTaxID: {
    type: Sequelize.STRING
  },
  companyName: {
    type: Sequelize.STRING
  },
  contact: {
    type: Sequelize.STRING
  },
  telephone: {
    type: Sequelize.STRING
  },
  fax: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  website: {
    type: Sequelize.STRING
  }
});

module.exports = Supplier;
