const jp = require('jsonpath');
const SalesInvoice = require('../../common/models/salesInvoice');

async function seed(data) {
  const fiscalYear = data.auditFile.header.fiscalYear;

  const salesInvoices = jp.query(data, '$.auditFile.sourceDocuments.salesInvoices');

  for (i in salesInvoices) {
    const salesInvoice = salesInvoices[i];

    await SalesInvoice.create({
      fiscalYear: fiscalYear,
      numberOfEntries: salesInvoice.numberOfEntries,
      totalDebit: salesInvoice.totalDebit,
      totalCredit: salesInvoice.totalCredit
    });
  }
}

module.exports = {
  seed
}