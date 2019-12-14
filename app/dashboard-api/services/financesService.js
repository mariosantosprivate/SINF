const totalCurrentAssets = require('./finances/totalCurrentAssets');
const totalNonCurrentAssets = require('./finances/totalNonCurrentAssets');
const totalExpenses = require('./finances/totalExpenses');
const totalIncome = require('./finances/totalIncome');
const accountsReceivable = require('./finances/accountsReceivable');
const accountsPayable = require('./finances/accountsPayable');
const totalRevenue = require('./finances/totalRevenue');
const revenueTrend = require('./finances/revenueTrend');
const expensesTrend = require('./finances/expensesTrend');
const incomeTrend = require('./finances/incomeTrend');
const financialAutonomy = require('./finances/financialAutonomy');

module.exports = {
  totalCurrentAssets,
  totalNonCurrentAssets,
  totalExpenses,
  totalIncome,
  accountsPayable,
  accountsReceivable,
  totalRevenue,
  revenueTrend,
  expensesTrend,
  incomeTrend,
  financialAutonomy,
};
