const financesService = require('../services/financesService');
const ErrorMessage = require('../utils/ErrorMessage');
const NotFoundError = require('../errors/NotFoundError');

async function getMetrics(req, res) {
  const { fiscalYear } = req.query;

  try {
    const totalRevenue = await financesService.totalRevenue(
      fiscalYear
    );

    return res.json({
      totalRevenue
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
