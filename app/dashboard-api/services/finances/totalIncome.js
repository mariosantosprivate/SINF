const expenses = require('./totalExpenses');
const revenue = require('./totalRevenue');

async function calculate(fiscalYear) {
  const totalExpenses = await expenses.calculate(fiscalYear);
  const totalRevenue = await revenue.calculate(fiscalYear);

  return parseFloat(totalRevenue - totalExpenses);
}

module.exports = calculate;
