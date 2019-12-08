const jp = require('jsonpath');
const Journal = require('../../common/models/journal');
const Transaction = require('../../common/models/transaction');

async function seed(data) {
  const { fiscalYear } = data.auditFile.header;

  const journals = jp.query(
    data,
    '$.auditFile.generalLedgerEntries.journal'
  )[0];

  for (i in journals) {
    const journal = journals[i];

    await Journal.create({
      journalId: journal.journalId,
      description: journal.description,
      fiscal_year: fiscalYear
    });

    let transactions = jp.query(journal, '$.transaction')[0];
    if (transactions !== undefined) {
      if (transactions instanceof Array) {
        for (i in transactions) {
          let transaction = transactions[i];
          /*if (transaction.supplierId !== undefined) {
            console.log(transaction);
          }
          if (transaction.supplierId == '245074205') {
            console.log(transaction);
          }*/
          await Transaction.create({
            transactionId: transaction.transactionId,
            period: transaction.period,
            transactionDate: transaction.transactionDate,
            sourceId: transaction.sourceId,
            description: transaction.description,
            glPostingDate: transaction.glPostingDate,
            docArchivalNumber: transaction.docArchivalNumber,
            customerId: transaction.customerId,
           // supplierId: transaction.supplierId,
            journalid: journal.journalId
          });
        }
      } else {
        if (transactions.supplierId !== undefined) {
          console.log(transactions);
        }
        await Transaction.create({
          transactionId: transactions.transactionId,
          period: transactions.period,
          transactionDate: transactions.transactionDate,
          sourceId: transactions.sourceId,
          description: transactions.description,
          glPostingDate: transactions.glPostingDate,
          docArchivalNumber: transactions.docArchivalNumber,
          customerId: transactions.customerId,
          //supplierId: transactions.supplierId,
          journal_id: journal.journalId
        });
      }
    }
  }
}

module.exports = {
  seed
};
