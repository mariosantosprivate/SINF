const Invoice = require('../../../common/models/invoice');
const ShippingInfo = require('../../../common/models/shippingInfo');
const formatTop5 = require('../../utils/formatTop5');

async function calculate(fiscalYear) {
  const valuePerRegion = {};

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
    const region = invoice['ShippingInfo.country'];

    if (!valuePerRegion[region]) {
      valuePerRegion[region] = 0;
    }

    valuePerRegion[region] += parseFloat(invoice.netTotal);
  }

  return formatTop5(valuePerRegion);
}

module.exports = calculate;
