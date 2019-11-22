let db = require('../db');
let Sequelize = require('sequelize');

let TransactionLine = db.define('TransactionLine', {
  type: {
    type: Sequelize.ENUM('credit', 'debit'),
    field: 'type',
    allowNull: false,
    validate: {
      notNull: { msg: 'Type is required' }
    }
  },
  recordID: {
    type: Sequelize.BIGINT,
    field: 'record_id',
    allowNull: false,
    validate: {
      notNull: { msg: 'Record ID is required' }
    }
  },
  accountID: {
    type: Sequelize.BIGINT,
    field: 'account_id',
    allowNull: false,
    validate: {
      notNull: { msg: 'Account ID is required' }
    }
  },
  sourceDocumentID: {
    type: Sequelize.BIGINT,
    field: 'source_document_id',
  },
  systemEntryDate: {
    type: Sequelize.DATE,
    field: 'system_entry_date',
    allowNull: false,
    validate: {
      notNull: { msg: 'System Entry Date is required' }
    }
  },
  description: {
    type: Sequelize.STRING,
    field: 'description',
    allowNull: false,
    validate: {
      notNull: { msg: 'Description is required' }
    }
  },
  amount: {
    type: Sequelize.DECIMAL,
    field: 'amount',
    allowNull: false,
    validate: {
      notNull: { msg: 'Amount is required' }
    }
  }
});

module.exports = TransactionLine;