const Sequelize = require('sequelize');
const db = require('../db');

const TransactionLine = db.define('TransactionLine', {
  type: {
    type: Sequelize.ENUM('credit', 'debit'),
    field: 'type',
    allowNull: false,
    validate: {
      notNull: { msg: 'Type is required' }
    }
  },
  recordId: {
    type: Sequelize.BIGINT,
    field: 'record_id',
    allowNull: false,
    validate: {
      notNull: { msg: 'Record ID is required' }
    }
  },
  accountId: {
    type: Sequelize.STRING,
    field: 'account_id',
    allowNull: false,
    validate: {
      notNull: { msg: 'Account ID is required' }
    }
  },
  sourceDocumentId: {
    type: Sequelize.STRING,
    field: 'source_document_id'
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
    type: Sequelize.FLOAT,
    field: 'amount',
    allowNull: false,
    validate: {
      notNull: { msg: 'Amount is required' }
    }
  }
});

module.exports = TransactionLine;
