const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'dummy', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
