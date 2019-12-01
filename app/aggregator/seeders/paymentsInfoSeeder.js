const jp = require('jsonpath');
const PaymentsInfo = require('../../common/models/paymentsInfo');

async function seed(data) {
  const fiscalYear = data.auditFile.header.fiscalYear;

  const paymentsInfos = jp.query(data, '$.auditFile.sourceDocuments.payments');

  for (i in paymentsInfos) {
    const paymentsInfo = paymentsInfos[i];
    
    await PaymentsInfo.create({
      fiscalYear: fiscalYear,
      numberOfEntries: paymentsInfo.numberOfEntries,
      totalDebit: paymentsInfo.totalDebit,
      totalCredit: paymentsInfo.totalCredit
    });
  }
}

module.exports = {
  seed
}