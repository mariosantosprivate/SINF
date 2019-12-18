const logisticsService = require('../services/logisticsService');
const ErrorMessage = require('../utils/ErrorMessage');

async function getMetrics(req, res) {
    const { fiscalYear } = req.query;

    try {
        const totalInventoryValue = await logisticsService.totalInventoryValue();
        const averageInventoryPeriod = await logisticsService.averageInventoryPeriod(/*firstYear, lastYear*/);
        const inventoryTurnover = await logisticsService.inventoryTurnover(/*firstYear, lastYear*/);
        const totalDeliveries = await logisticsService.totalDeliveries(fiscalYear);
        const deliveryStatus = await logisticsService.deliveryStatus(fiscalYear);
        const deliveryByCountry = await logisticsService.deliveryByCountry(fiscalYear);

        return res.json({
            totalInventoryValue,
            averageInventoryPeriod,
            inventoryTurnover,
            totalDeliveries,
            deliveryStatus,
            deliveryByCountry,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json(new ErrorMessage());
    }
}

module.exports = {
    getMetrics,
};
