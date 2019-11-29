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
  },
  // Document Totals
  taxPayable: {
    type: Sequelize.DECIMAL,
    field: 'tax_payable'
  },
  netTotal: {
    type: Sequelize.DECIMAL,
    field: 'net_total'
  },
  grossTotal: {
    type: Sequelize.DECIMAL,
    field: 'gross_total'
  }
});

module.exports = StockMovement;
