const db = require('../db');
const Sequelize = require('sequelize');

const StockMovement = db.define('StockMovement', {
  documentNumber: {
    type: Sequelize.STRING,
    primaryKey: true,
    field: 'document_number'
  },
  movementDate: {
    type: Sequelize.DATEONLY,
    field: 'movement_date'
  },
  movementType: {
    type: Sequelize.STRING,
    field: 'movement_type'
  }
});

module.exports = StockMovement;
