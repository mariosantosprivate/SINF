const Sequelize = require('sequelize');
const db = require('../db');

const AddressStructure = db.define('AdressStructure', {
  buildingNumber: {
    type: Sequelize.BIGINT,
  },
  streetName: {
    type: Sequelize.STRING,
  },
  addressDetail: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  postalCode: {
    type: Sequelize.STRING,
  },
  region: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
});

module.exports = AddressStructure;
