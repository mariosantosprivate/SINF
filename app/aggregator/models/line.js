let db = require("../db");
let Sequelize = require("sequelize");

let Line = db.define("Line", {
  code: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  type: {
    type: Sequelize.ENUM,
    values: ["Credit", "Debit"],
    allowNull: false,
    validate: {
      notNull: { msg: "Type is required" }
    }
  },
  recordID: {
    type: Sequelize.BIGINT,
    allowNull: false,
    validate: {
      notNull: { msg: "Record ID is required" }
    }
  },
  accountID: {
    type: Sequelize.BIGINT,
    allowNull: false,
    validate: {
      notNull: { msg: "Account ID is required" }
    }
  },
  sourceDocumentID: {
    type: Sequelize.BIGINT
  },
  systemEntryDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notNull: { msg: "System Entry Date is required" }
    }
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Description is required" }
    }
  },
  amount: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notNull: { msg: "Amount is required" }
    }
  }
});

module.exports = Line;