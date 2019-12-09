const purchasesService = require('../services/purchasesService');
const ErrorMessage = require('../utils/ErrorMessage');

async function getMetrics(req, res) {
  const { fiscalYear } = req.query;

  try {
    const totalPurchasesValue = await purchasesService.totalPurchasesValue(fiscalYear);

    return res.json({
      totalPurchasesValue,
    });
  } catch (err) {
    return res.status(500).json(new ErrorMessage());
  }
}

module.exports = {
  getMetrics,
};
