const financesService = require('../services/financesService');
const ErrorMessage = require('../utils/ErrorMessage');
const NotFoundError = require('../errors/NotFoundError');

async function getMetrics(req, res) {
  const { fiscalYear } = req.query;

  try {
    const totalRevenue = await financesService.totalRevenue(fiscalYear);

    const totalExpenses = await financesService.totalExpenses(fiscalYear);

    const totalIncome = await financesService.totalIncome(fiscalYear);
    const accountsReceivable = await financesService.accountsReceivable(
      fiscalYear
    );

    return res.json({
      totalRevenue,
      totalExpenses,
      totalIncome,
      accountsReceivable
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
