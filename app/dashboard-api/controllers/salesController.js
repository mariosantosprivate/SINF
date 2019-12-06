const salesService = require('../services/salesService');
const ErrorMessage = require('../utils/ErrorMessage');
const NotFoundError = require('../errors/NotFoundError');

async function getMetrics(req, res) {
  const { fiscalYear } = req.query;

  try {
    const totalSalesNetValue = await salesService.totalSalesNetValue(fiscalYear);
    const salesTrend = await salesService.salesTrend(fiscalYear);
    const topSoldProducts = await salesService.topSoldProducts(fiscalYear);

    return res.json({
      totalSalesNetValue,
      salesTrend,
      topSoldProducts,
    });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).json(new ErrorMessage(err.message));
    }
    return res.status(500).json(new ErrorMessage());
  }
}

module.exports = {
  getMetrics,
};
