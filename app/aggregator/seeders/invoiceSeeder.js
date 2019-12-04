const jp = require('jsonpath');
const Invoice = require('../../common/models/invoice');
const ShippingInfo = require('../../common/models/shippingInfo');

async function seed(data) {
  const { fiscalYear } = data.auditFile.header;

  const invoices = jp.query(data, '$.auditFile.sourceDocuments.salesInvoices.invoice')[0];

  for (const key in invoices) {
    if (Object.prototype.hasOwnProperty.call(invoices, key)) {
      const invoice = invoices[key];

      const shipTo = await ShippingInfo.create({
        deliveryDate: invoice.shipTo.deliveryDate,
        addressDetail: invoice.shipTo.address.addressDetail,
        city: invoice.shipTo.address.city,
        postalCode: invoice.shipTo.address.postalCode,
        country: invoice.shipTo.address.country,
      });

      const shipFrom = await ShippingInfo.create({
        deliveryDate: invoice.shipFrom.deliveryDate,
        addressDetail: invoice.shipFrom.address.addressDetail,
        city: invoice.shipFrom.address.city,
        postalCode: invoice.shipFrom.address.postalCode,
        country: invoice.shipFrom.address.country,
      });

      await Invoice.create({
        invoiceNo: invoice.invoiceNo,
        invoiceDate: invoice.invoiceDate,
        taxPayable: invoice.documentTotals.taxPayable,
        netTotal: invoice.documentTotals.netTotal,
        grossTotal: invoice.documentTotals.grossTotal,
        fiscal_year: fiscalYear,
        customer_id: invoice.customerId,
        ship_to_info_id: shipTo.id,
        ship_from_info_id: shipFrom.id,
      });
    }
  }
}

module.exports = {
  seed,
};
