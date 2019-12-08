const metadataService = require('../services/metadataService');
const ErrorMessage = require('../utils/ErrorMessage');

async function getFiscalYears(req, res) {
  try {
    const fiscalYears = await metadataService.getFiscalYears();

    return res.json(fiscalYears);
  } catch (err) {
    return res.status(500).json(new ErrorMessage());
  }
}

module.exports = {
  getFiscalYears,
};
