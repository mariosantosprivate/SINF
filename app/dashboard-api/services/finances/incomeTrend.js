const expensesTrend = require('./expensesTrend');
const revenueTrens = require('./revenueTrend');

async function calculate(fiscalYear) {
  const expensesPerMonth = await expensesTrend.calculate(fiscalYear);
  const revenuePerMonth = await revenueTrens.calculate(fiscalYear);
  const incomePerMonth = [];
  if (!expensesPerMonth && !revenuePerMonth) {
    throw new Error(`There is no income trend for the fiscal year ${fiscalYear}`);
  }
  for (let i = 0; i < 12; i += 1) {
    incomePerMonth[i] = revenuePerMonth[i] - expensesPerMonth[i];
  }

  return incomePerMonth;
}

module.exports = calculate;
