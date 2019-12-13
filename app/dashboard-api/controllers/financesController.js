const financesService = require('../services/financesService');
const ErrorMessage = require('../utils/ErrorMessage');
const NotFoundError = require('../errors/NotFoundError');

async function getMetrics(req, res) {
  const { fiscalYear } = req.query;

  try {
    const totalAssets = await financesService.totalAssets(fiscalYear);

    // const totalExpenses = await financesService.totalExpenses(fiscalYear);

    // const totalIncome = await financesService.totalIncome(fiscalYear);
    const accountsReceivable = await financesService.accountsReceivable(
      fiscalYear
    );
    const totalRevenue = await financesService.totalRevenue(fiscalYear);

    let financialAutonomy = await financesService.financialAutonomy(fiscalYear);
    financialAutonomy = financialAutonomy / totalAssets;

    const revenueTrend = await financesService.revenueTrend(fiscalYear);

    return res.json({
      totalRevenue,
      //totalExpenses,
      totalAssets,
      //totalIncome,
      accountsReceivable,
      financialAutonomy,
      revenueTrend
    });
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).json(new ErrorMessage(err.message));
    }
    return res.status(500).json(new ErrorMessage());
  }
}

module.exports = {
  getMetrics
};
