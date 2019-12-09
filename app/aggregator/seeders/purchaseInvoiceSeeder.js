const axios = require('../requests/axios');
const PurchaseInvoice = require('../../common/models/purchaseInvoice');

async function seed(data) {
  const axiosInstance = axios.getInstance();

  const { fiscalYear } = data.auditFile.header;

  const request = await axiosInstance.get(`invoiceReceipt/invoices/odata?$filter=year(DocumentDate) eq ${fiscalYear}`);
  const purchaseInvoices = request.data.items;

  for (const key in purchaseInvoices) {
    if (Object.prototype.hasOwnProperty.call(purchaseInvoices, key)) {
      const purchaseInvoice = purchaseInvoices[key];

      await PurchaseInvoice.create({
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
    }
  }
}

module.exports = {
  seed,
};
