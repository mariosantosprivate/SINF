let db = require("../db");
let Sequelize = require("sequelize");

let Journal = db.define("Journal", {
    journalID: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Description is required" },
        },
    }
});

module.exports = Journal;
