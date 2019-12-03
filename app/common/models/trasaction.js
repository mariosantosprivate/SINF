let db = require('../db');
let Sequelize = require('sequelize');

let Transaction = db.define('Transaction', {
    transactionID: {
        type: Sequelize.BIGINT,
        field: 'transaction_id',
        primaryKey: true
    },
    period: {
        type: Sequelize.INTEGER,
        field: 'period',
        allowNull: false,
        validate: {
            notNull: { msg: 'Period is required' },
        },
    },
    transactionDate: {
        type: Sequelize.DATE,
        field: 'transaction_date',
        allowNull: false,
        validate: {
            notNull: { msg: 'Transacation Date is required' },
        },
    },
    sourceID: {
        type: Sequelize.DATE,
        field: 'source_id',
    },
    description: {
        type: Sequelize.STRING,
        field: 'description',
        allowNull: false,
        validate: {
            notNull: { msg: 'Description is required' },
        },
    },
    GLPostingDate: {
        type: Sequelize.DATE,
        field: 'gl_posting_date',
        allowNull: false,
        validate: {
            notNull: { msg: 'Transacation Date is required' },
        },
    }
});

module.exports = Transaction;
