const Invoice = require('../../../common/models/invoice');
const ShippingInfo = require('../../../common/models/shippingInfo');
const formatTop5 = require('../../utils/formatTop5');

async function calculate(fiscalYear) {
    const deliveryPerCountry = {};

    const invoices = await Invoice.findAll({
        raw: true,
        where: {
            fiscal_year: fiscalYear,
        },
        include: [{
            model: ShippingInfo,
        }],
    });

    for (const invoice of invoices) {
        // since the name of the property ShippingInfo.country contains a "." (dot),
        // the property needs to be fetched like this
        const country = invoice['ShippingInfo.country'];

        if (!deliveryPerCountry[country]) {
            deliveryPerCountry[country] = 0;
        }

        deliveryPerCountry[country]++;
    }

    return formatTop5(deliveryPerCountry);
}

module.exports = calculate;
