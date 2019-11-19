const db = require('../db');
const Sequelize = require('sequelize');

const ShippingInfo = db.define('ShippingInfo', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  deliveryDate: {
    type: Sequelize.DATEONLY,
    field: 'delivery_date'
  },
  addressDetail: {
    type: Sequelize.STRING,
    field: 'address_detail'
  },
  city: {
    type: Sequelize.STRING
  },
  postalCode: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  }
});

module.exports = ShippingInfo;