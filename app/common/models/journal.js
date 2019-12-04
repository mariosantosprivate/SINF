const Sequelize = require('sequelize');
const db = require('../db');

const Journal = db.define('Journal', {
  journalID: {
    type: Sequelize.BIGINT,
    field: 'journal_id',
    primaryKey: true,
  },
  description: {
    type: Sequelize.STRING,
    field: 'description',
    allowNull: false,
    validate: {
      notNull: { msg: 'Description is required' },
    },
  },
});

module.exports = Journal;
