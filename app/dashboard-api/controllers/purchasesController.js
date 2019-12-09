const purchasesService = require('../services/purchasesService');
const ErrorMessage = require('../utils/ErrorMessage');

async function getMetrics(req, res) {
  const { fiscalYear } = req.query;

  try {
    const totalPurchasesValue = await purchasesService.totalPurchasesValue(fiscalYear);
    const totalPurchaseOrders = await purchasesService.totalPurchaseOrders(fiscalYear);
    const purchasesTrend = await purchasesService.purchasesTrend(fiscalYear);

    return res.json({
      totalPurchasesValue,
      totalPurchaseOrders,
      purchasesTrend,
    });
  } catch (err) {
    return res.status(500).json(new ErrorMessage());
  }
}

module.exports = {
  getMetrics,
};
