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
      as: 'shipToInfo',
    }],
  });

  for (const invoice of invoices) {
    // since the name of the property ShippingInfo.country contains a "." (dot),
    // the property needs to be fetched like this
    const date = new Date(invoice['shipToInfo.deliveryDate']);
    const today = new Date();
    if (date <= today) {
      deliveryStatus[delivered] += 1;
    } else {
      deliveryStatus[undelivered] += 1;
    }
  }

  return formatTop5(deliveryStatus);
}

module.exports = calculate;
