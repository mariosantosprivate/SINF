let db = require('../db');
let Sequelize = require('sequelize');

let GeneralLedgerEntries = db.define('GeneralLedgerEntries', {
    fiscalYear: {
        type: Sequelize.INTEGER,
        field: 'fiscal_year',
        primaryKey: true
    },
    numberOfEntries: {
        type: Sequelize.INTEGER,
        field: 'number_of_entries',
        allowNull: false,
        validate: {
            notNull: { msg: 'NumberOfEntries is required' },
        },
    },
    totalDebit: {
        type: Sequelize.INTEGER,
        field: 'total_debit',
        allowNull: false,
        validate: {
            notNull: { msg: 'TotalDebit is required' },
        },
    },
    totalCredit: {
        type: Sequelize.INTEGER,
        field: 'total_credit',
        allowNull: false,
        validate: {
            notNull: {
                msg: 'TotalCredit is required'
            },
        },
    },
    numberOfEntries: {
        type: Sequelize.INTEGER,
        field: 'number_of_entries',
        allowNull: false,
        validate: {
            notNull: { msg: 'NumberOfEntries is required' },
        },
    }
});

module.exports = GeneralLedgerEntries;
