const jp = require('jsonpath');
const SalesInvoice = require('../../common/models/salesInvoice');

async function seed(data) {
  const { fiscalYear } = data.auditFile.header;

  const salesInvoices = jp.query(data, '$.auditFile.sourceDocuments.salesInvoices');

  for (const key in salesInvoices) {
    if (Object.prototype.hasOwnProperty.call(salesInvoices, key)) {
      const salesInvoice = salesInvoices[key];

      await SalesInvoice.create({
        fiscalYear,
        numberOfEntries: salesInvoice.numberOfEntries,
        totalDebit: salesInvoice.totalDebit,
        totalCredit: salesInvoice.totalCredit,
      });
    }
  }
}

module.exports = {
  seed,
};
