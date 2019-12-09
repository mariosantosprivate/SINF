const axios = require('../requests/axios');
const PurchaseInvoice = require('../../common/models/purchaseInvoice');
const PurchaseInvoiceLine = require('../../common/models/purchaseInvoiceLine');

async function seed(data) {
  const axiosInstance = axios.getInstance();

  const { fiscalYear } = data.auditFile.header;

  const request = await axiosInstance.get(`invoiceReceipt/invoices/odata?$filter=year(DocumentDate) eq ${fiscalYear}`);
  const purchaseInvoices = request.data.items;

  for (const key in purchaseInvoices) {
    if (Object.prototype.hasOwnProperty.call(purchaseInvoices, key)) {
      const purchaseInvoice = purchaseInvoices[key];

      const savedPurchaseInvoice = await PurchaseInvoice.create({
        fiscalYear,
        documentDate: purchaseInvoice.documentDate,
        grossValueAmount: purchaseInvoice.grossValueAmount,
        allowanceChargeAmount: purchaseInvoice.allowanceChargeAmountAmount,
        taxExclusiveAmount: purchaseInvoice.taxExclusiveAmountAmount,
        taxTotalAmount: purchaseInvoice.taxTotalAmount,
        payableAmount: purchaseInvoice.payableAmountAmount,
        wTaxTotalAmount: purchaseInvoice.wTaxTotalAmount,
        totalLiabilityAmount: purchaseInvoice.totalLiabilityAmount,
        discountInValueAmount: purchaseInvoice.discountInValueAmountAmount,
        supplier_id: purchaseInvoice.sellerSupplierParty,
      });

      let lines = purchaseInvoice.documentLines;

      // xml2js doesn't parse lines as an array if there's only 1
      if (!Array.isArray(lines)) { lines = [lines]; }

      for (const key2 in lines) {
        if (Object.prototype.hasOwnProperty.call(lines, key2)) {
          const line = lines[key2];

          await PurchaseInvoiceLine.create({
            invoice_id: savedPurchaseInvoice.id,
            product_code: line.purchasesItemBaseEntityId,
            grossValueAmount: line.grossValueAmount,
          });
        }
      }
    }
  }
}

module.exports = {
  seed,
};
