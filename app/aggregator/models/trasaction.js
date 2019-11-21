let db = require("../db");
let Sequelize = require("sequelize");

let Transaction = db.define("Transaction", {
    transactionID: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    period: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "Period is required" },
        },
    },
    transactionDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notNull: { msg: "Transacation Date is required" },
        },
    },
    sourceID: {
        type: Sequelize.DATE
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Description is required" },
        },
    },
    GLPostingDate: {
        type: Sequelize.DATE,
        //Não sei meter ao segundo - (datatype):AAAA-MM-DDThh:mm:ss.
        allowNull: false,
        validate: {
            notNull: { msg: "Transacation Date is required" },
        },
    },
    customerID: {
        type: Sequelize.BIGINT
    },
    supplierID: {
        type: Sequelize.BIGINT
    }
});

module.exports = Transaction;
