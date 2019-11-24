let db = require("../db");
let Sequelize = require("sequelize");

const Supplier = db.define("Supplier", {
  supplierId: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  supplierTaxId: {
    type: Sequelize.INTEGER
  },
  companyName: {
    type: Sequelize.STRING
  },
  contact: {
    type: Sequelize.STRING
  },
  telephone: {
    type: Sequelize.STRING
  },
  fax: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  website: {
    type: Sequelize.STRING
  }
});

module.exports = Supplier;
