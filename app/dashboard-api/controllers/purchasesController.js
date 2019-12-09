const purchasesService = require('../services/purchasesService');
const ErrorMessage = require('../utils/ErrorMessage');

async function getMetrics(req, res) {
  const { fiscalYear } = req.query;

  try {
    const totalPurchasesValue = await purchasesService.totalPurchasesValue(fiscalYear);
    const totalPurchaseOrders = await purchasesService.totalPurchaseOrders(fiscalYear);
    const purchasesTrend = await purchasesService.purchasesTrend(fiscalYear);
    const topSuppliers = await purchasesService.topSuppliers(fiscalYear);
    const topPurchasedProducts = await purchasesService.topPurchasedProducts(fiscalYear);

    return res.json({
      totalPurchasesValue,
      totalPurchaseOrders,
      purchasesTrend,
      topSuppliers,
      topPurchasedProducts,
    });
  } catch (err) {
    return res.status(500).json(new ErrorMessage());
  }
}

module.exports = {
  getMetrics,
};
