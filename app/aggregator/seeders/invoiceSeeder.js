const jp = require('jsonpath');
const axios = require('../requests/axios');
const Invoice = require('../../common/models/invoice');
const InvoiceLine = require('../../common/models/invoiceLine');
const ShippingInfo = require('../../common/models/shippingInfo');

async function seedFromSaft(data) {
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

      let invoiceLines = invoice.line;

      // xml2js doesn't parse lines as an array if there's only 1
      if (!Array.isArray(invoiceLines)) { invoiceLines = [invoiceLines]; }

      for (const key2 in invoiceLines) {
        if (Object.prototype.hasOwnProperty.call(invoiceLines, key2)) {
          const invoiceLine = invoiceLines[key2];

          await InvoiceLine.create({
            invoice_no: invoice.invoiceNo,
            lineNumber: invoiceLine.lineNumber,
            product_code: invoiceLine.productCode,
            quantity: invoiceLine.quantity,
            unitOfMeasure: invoiceLine.unitOfMeasure,
            unitPrice: invoiceLine.unitPrice,
            description: invoiceLine.description,
            creditAmount: invoiceLine.creditAmount,
            settlementAmount: invoiceLine.settlementAmount,
          });
        }
      }
    }
  }
}

async function seedFromJasmin(data) {
  const axiosInstance = axios.getInstance();

  const { fiscalYear } = data.auditFile.header;
  const request = await axiosInstance.get(`billing/invoices/odata?$filter=year(DocumentDate) eq ${fiscalYear}`);
  const invoices = request.data.items;

  for (const key in invoices) {
    if (Object.prototype.hasOwnProperty.call(invoices, key)) {
      const invoice = invoices[key];
      if (invoice.buyerCustomerPartyTaxId != null) {
        const shipTo = await ShippingInfo.create({
          deliveryDate: invoice.unloadingDateTime,
          addressDetail: invoice.unloadingPointAddress,
          city: invoice.unloadingCityName,
          postalCode: invoice.unloadingPostalZone,
          country: invoice.unloadingCountry,
        });

        const shipFrom = await ShippingInfo.create({
          deliveryDate: invoice.loadingDateTime,
          addressDetail: invoice.loadingPointAddress,
          city: invoice.loadingCityName,
          postalCode: invoice.loadingPostalZone,
          country: invoice.loadingCountry,
        });
        const customerId = `${invoice.buyerCustomerParty}.${invoice.buyerCustomerPartyTaxId}`;
        try {
          await Invoice.create({
            fiscal_year: fiscalYear,
            invoiceNo: invoice.documentLines[0].invoiceId,
            invoiceDate: invoice.documentDate,
            taxPayable: invoice.payableAmountAmount,
            netTotal: invoice.taxExclusiveAmountAmount,
            grossTotal: invoice.grossValueAmount,
            customer_id: customerId,
            ship_to_info_id: shipTo.id,
            ship_from_info_id: shipFrom.id,
          });
        } catch (err) {
          //console.log(err);
        }


        let invoiceLines = invoice.documentLines;

        // xml2js doesn't parse lines as an array if there's only 1
        if (!Array.isArray(invoiceLines)) { invoiceLines = [invoiceLines]; }

        for (const key2 in invoiceLines) {
          if (Object.prototype.hasOwnProperty.call(invoiceLines, key2)) {
            const invoiceLine = invoiceLines[key2];
            const credit_amount = invoiceLine.quantity * invoiceLine.unitPriceAmount;
            await InvoiceLine.create({
              invoice_no: invoiceLine.invoiceId,
              product_code: invoiceLine.salesItem,
              quantity: invoiceLine.quantity,
              unitPrice: invoiceLine.unitPriceAmount,
              description: invoiceLine.description,
              creditAmount: invoiceLine.taxExclusiveAmountAmount,
            });
          }
        }
      }
    }
  }
}

async function seed(data) {
  await seedFromSaft(data);
  await seedFromJasmin(data);
}

module.exports = {
  seed,
};
