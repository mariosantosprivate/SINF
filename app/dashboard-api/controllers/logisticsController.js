const logisticsService = require('../services/logisticsService');
const ErrorMessage = require('../utils/ErrorMessage');

async function getMetrics(req, res) {
    const { fiscalYear } = req.query;

    try {
        const totalInventoryValue = await logisticsService.totalInventoryValue();
        const totalDeliveries = await logisticsService.totalDeliveries(fiscalYear);
        const deliveryStatus = await logisticsService.deliveryStatus(fiscalYear);
        const deliveryByCountry = await logisticsService.deliveryByCountry(fiscalYear);

        return res.json({
            totalInventoryValue,
            totalDeliveries,
            deliveryStatus,
            deliveryByCountry,
        });
    } catch (err) {
        return res.status(500).json(new ErrorMessage());
    }
}

module.exports = {
    getMetrics,
};
