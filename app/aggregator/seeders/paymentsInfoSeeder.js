const jp = require('jsonpath');
const PaymentsInfo = require('../../common/models/paymentsInfo');

async function seed(data) {
  const { fiscalYear } = data.auditFile.header;

  const paymentsInfos = jp.query(data, '$.auditFile.sourceDocuments.payments');

  for (const key in paymentsInfos) {
    if (Object.prototype.hasOwnProperty.call(paymentsInfos, key)) {
      const paymentsInfo = paymentsInfos[key];

      await PaymentsInfo.create({
        fiscalYear,
        numberOfEntries: paymentsInfo.numberOfEntries,
        totalDebit: paymentsInfo.totalDebit,
        totalCredit: paymentsInfo.totalCredit,
      });
    }
  }
}

module.exports = {
  seed,
};
