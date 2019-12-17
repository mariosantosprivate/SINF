const Sequelize = require('sequelize');
const db = require('../db');

const MaterialStock = db.define('MaterialStock', {
    stock: {
        type: Sequelize.BIGINT,
        field: 'stock',
        allowNull: false,
        validate: {
            notNull: { msg: 'stock is required' },
        },
    },
    valueOfStock: {
        type: Sequelize.FLOAT,
        field: 'valueOfStock',
        allowNull: false,
        validate: {
            notNull: { msg: 'valueOfStock is required' },
        },
    },
});

module.exports = MaterialStock;
