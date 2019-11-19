const db = require('../db');
const Sequelize = require('sequelize');

const MovementOfGoods = db.define('MovementOfGoods', {
  fiscalYear: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    field: 'fiscal_year'
  },
  numberOfMovementLines: {
    type: Sequelize.BIGINT,
    field: 'number_of_movement_lines'
  },
  totalQuantityIssued: {
    type: Sequelize.DECIMAL,
    field: 'total_quantity_issued'
  }
});

module.exports = MovementOfGoods;
