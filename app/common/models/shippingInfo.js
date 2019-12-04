const Sequelize = require('sequelize');
const db = require('../db');

const ShippingInfo = db.define('ShippingInfo', {
  deliveryDate: {
    type: Sequelize.DATEONLY,
    field: 'delivery_date',
  },
  addressDetail: {
    type: Sequelize.STRING,
    field: 'address_detail',
  },
  city: {
    type: Sequelize.STRING,
  },
  postalCode: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
}, { tableName: 'ShippingInfo' });

module.exports = ShippingInfo;
