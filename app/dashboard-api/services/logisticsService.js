const totalInventoryValue = require('./logistics/totalInventoryValue');
const averageInventoryPeriod = require('./logistics/averageInventoryPeriod');
const inventoryTurnover = require('./logistics/inventoryTurnover');
const totalDeliveries = require('./logistics/totalDeliveries');
const deliveryStatus = require('./logistics/deliveryStatus');
const deliveryByCountry = require('./logistics/deliveryByCountry');

module.exports = {
    totalInventoryValue,
    averageInventoryPeriod,
    inventoryTurnover,
    totalDeliveries,
    deliveryStatus,
    deliveryByCountry,
};
