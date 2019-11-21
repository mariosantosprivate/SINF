let db = require("../db");
let Sequelize = require("sequelize");

let GeneralLedgerEntries = db.define("GeneralLedgerEntries", {
    GLEDate: {
        type: Sequelize.DATE,
        primaryKey: true
    },
    numberOfEntries: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "NumberOfEntries is required" },
        },
    },
    totalDebit: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "TotalDebit is required" },
        },
    },
    totalCredit: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "TotalCredit is required" },
        },
    },
    numberOfEntries: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "NumberOfEntries is required" },
        },
    }
});

module.exports = GeneralLedgerEntries;
