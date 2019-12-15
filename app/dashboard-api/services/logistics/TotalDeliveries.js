const Invoice = require('../../../common/models/invoice');
const ShippingInfo = require('../../../common/models/shippingInfo');

async function calculate(fiscalYear) {
    let cont = 0;

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
