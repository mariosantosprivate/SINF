const axios = require('../requests/axios');
const PurchaseInvoice = require('../../common/models/purchaseInvoice');

async function seed(data) {
  const axiosInstance = axios.getInstance();
  
  const fiscalYear = data.auditFile.header.fiscalYear;

  const request = await axiosInstance.get(`invoiceReceipt/invoices/odata?$filter=year(DocumentDate) eq ${fiscalYear}`);
  const purchaseInvoices = request.data.items;

  for (i in purchaseInvoices) {
    const purchaseInvoice = purchaseInvoices[i];

    await PurchaseInvoice.create({
      fiscalYear: fiscalYear,
      documentDate: purchaseInvoice.documentDate,
      grossValueAmount: purchaseInvoice.grossValueAmount,
      allowanceChargeAmount: purchaseInvoice.allowanceChargeAmountAmount,
      taxExclusiveAmount: purchaseInvoice.taxExclusiveAmountAmount,
      taxTotalAmount: purchaseInvoice.taxTotalAmount,
      payableAmount: purchaseInvoice.payableAmountAmount,
      wTaxTotalAmount: purchaseInvoice.wTaxTotalAmount,
      totalLiabilityAmount: purchaseInvoice.totalLiabilityAmount,
      discountInValueAmount: purchaseInvoice.discountInValueAmountAmount
    });
  }
}

module.exports = {
  seed
};
