const Invoice = require('../../../common/models/invoice');
const ShippingInfo = require('../../../common/models/shippingInfo');
const formatTop5 = require('../../utils/formatTop5');

async function calculate(fiscalYear) {
    const cont = 0;

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
        cont++;
    }

    return cont;
}

module.exports = calculate;
