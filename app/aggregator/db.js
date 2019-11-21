const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'dummy', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});

module.exports = sequelize;
