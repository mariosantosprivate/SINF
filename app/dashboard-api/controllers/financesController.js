const financesService = require('../services/financesService');
const ErrorMessage = require('../utils/ErrorMessage');
const NotFoundError = require('../errors/NotFoundError');

async function getMetrics(req, res) {
  const { fiscalYear } = req.query;

  try {
    const totalAssets = (await financesService.totalCurrentAssets(fiscalYear))
      + (await financesService.totalNonCurrentAssets(fiscalYear));

    const totalExpenses = await financesService.totalExpenses(fiscalYear);

    const totalIncome = await financesService.totalIncome(fiscalYear);
    const accountsReceivable = await financesService.accountsReceivable(
      fiscalYear,
    );
    const totalRevenue = await financesService.totalRevenue(fiscalYear);
    const accountsPayable = await financesService.accountsPayable(fiscalYear);

    let financialAutonomy = await financesService.financialAutonomy(fiscalYear);
    // financialAutonomy = financialAutonomy / totalAssets;
    financialAutonomy /= totalAssets / 100;

    const revenueTrend = await financesService.revenueTrend(fiscalYear);

    const expensesTrend = await financesService.expensesTrend(fiscalYear);

    const incomeTrend = await financesService.incomeTrend(fiscalYear);

    return res.json({
      totalRevenue,
      totalExpenses,
      totalAssets,
      totalIncome,
      accountsPayable,
      accountsReceivable,
      financialAutonomy,
      revenueTrend,
      expensesTrend,
      incomeTrend,
    });
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).json(new ErrorMessage(err.message));
    }
    return res.status(500).json(new ErrorMessage());
  }
}

module.exports = {
  getMetrics,
};
