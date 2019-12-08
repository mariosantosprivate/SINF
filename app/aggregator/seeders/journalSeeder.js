const jp = require('jsonpath');
const Journal = require('../../common/models/journal');
const Transaction = require('../../common/models/trasaction');

async function seed(data) {
  const { fiscalYear } = data.auditFile.header;

  const journals = jp.query(
    data,
    '$.auditFile.generalLedgerEntries.journal'
  )[0];

  for (i in journals) {
    const journal = journals[i];

    await Journal.create({
      journalID: journal.journalId,
      description: journal.description,
      fiscal_year: fiscalYear,
      journal_id: journal.journalId
    });

    let transactions = jp.query(journal, '$.transaction')[0];
    if (transactions !== undefined) {
      if (transactions instanceof Array) {
        for (i in transactions) {
          const transaction = transactions[i];

          await Transaction.create({
            transactionId: transaction.transactionId,
            period: transaction.period,
            transactionDate: transaction.transactionDate,
            sourceId: transaction.sourceId,
            description: transaction.description,
            glPostingDate: transaction.glPostingDate,
            docArchivalNumber: transaction.docArchivalNumber,
            customer_id: transaction.customerID,
            supplier_id: transaction.supplierID,
            journal_id: journal.journalId
          });
        }
      } else {
        await Transaction.create({
          transactionId: transactions.transactionId,
          period: transactions.period,
          transactionDate: transactions.transactionDate,
          sourceId: transactions.sourceId,
          description: transactions.description,
          glPostingDate: transactions.glPostingDate,
          docArchivalNumber: transactions.docArchivalNumber,
          customer_id: transactions.customerID,
          supplier_id: transactions.supplierID,
          journal_id: journal.journalId
        });
      }
    }
  }
}

module.exports = {
  seed
};
