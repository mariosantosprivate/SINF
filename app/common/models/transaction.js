const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('Transaction', {
  transactionId: {
    type: Sequelize.STRING,
    field: 'transaction_id',
    primaryKey: true
  },
  period: {
    type: Sequelize.INTEGER,
    field: 'period',
    allowNull: false,
    validate: {
      notNull: { msg: 'Period is required' }
    }
  },
  transactionDate: {
    type: Sequelize.DATE,
    field: 'transaction_date',
    allowNull: false,
    validate: {
      notNull: { msg: 'Transacation Date is required' }
    }
  },
  sourceId: {
    type: Sequelize.STRING,
    field: 'source_id'
  },
  description: {
    type: Sequelize.STRING,
    field: 'description',
    allowNull: false,
    validate: {
      notNull: { msg: 'Description is required' }
    }
  },
  docArchivalNumber: {
    type: Sequelize.STRING,
    field: 'description',
    allowNull: false,
    validate: {
      notNull: { msg: 'Description is required' }
    }
  },
  glPostingDate: {
    type: Sequelize.DATE,
    field: 'gl_posting_date',
    allowNull: false,
    validate: {
      notNull: { msg: 'Transacation Date is required' }
    }
  }
});

module.exports = Transaction;
