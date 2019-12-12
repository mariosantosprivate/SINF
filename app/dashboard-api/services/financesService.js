const totalCurrentAssets = require('./finances/totalCurrentAssets');
const totalNonCurrentAssets = require('./finances/totalNonCurrentAssets');
const totalExpenses = require('./finances/totalExpenses');
const totalIncome = require('./finances/totalIncome');
const accountsReceivable = require('./finances/accountsReceivable');
const totalRevenue = require('./finances/totalRevenue');
const revenueTrend = require('./finances/revenueTrend');
const financialAutonomy = require('./finances/financialAutonomy');

module.exports = {
  totalCurrentAssets,
  totalNonCurrentAssets,
  totalExpenses,
  totalIncome,
  accountsReceivable,
  totalRevenue,
  revenueTrend,
  financialAutonomy
};
