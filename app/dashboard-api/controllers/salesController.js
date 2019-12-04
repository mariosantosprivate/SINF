const salesService = require('../services/salesService');
const ErrorMessage = require('../utils/ErrorMessage');
const NotFoundError = require('../errors/NotFoundError');

async function getMetrics(req, res) {
  const { fiscalYear } = req.query;

  try {
    const totalSalesNetValue = await salesService.totalSalesNetValue(fiscalYear);
    const salesTrend = await salesService.salesTrend(fiscalYear);

    return res.json({
      totalSalesNetValue,
      salesTrend,
    });
  } catch (err) {
    if (err instanceof NotFoundError) { res.status(404).json(new ErrorMessage(err.message)); }
    return res.status(500).json(new ErrorMessage());
  }
}

module.exports = {
  getMetrics,
};
