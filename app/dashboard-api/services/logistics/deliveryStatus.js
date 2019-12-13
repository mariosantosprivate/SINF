const Invoice = require('../../../common/models/invoice');
const ShippingInfo = require('../../../common/models/shippingInfo');
const formatTop5 = require('../../utils/formatTop5');

async function calculate(fiscalYear) {
    const delivered = 'delivered';
    const undelivered = 'undelivered';
    const deliveryStatus = {};
    deliveryStatus[delivered] = 0;
    deliveryStatus[undelivered] = 0;

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
        const date = invoice['ShippingInfo.delivery_date'];
        const today = new Date();
        if (date.getTime() <= today.getTime()) {
            deliveryStatus[delivered]++;
        } else {
            deliveryStatus[undelivered]++;
        }
    }

    return formatTop5(deliveryStatus);
}

module.exports = calculate;
