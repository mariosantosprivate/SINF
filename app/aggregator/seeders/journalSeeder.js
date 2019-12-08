const jp = require('jsonpath');
const Journal = require('../../common/models/journal');
const Transaction = require('../../common/models/transaction');
const TransactionLine = require('../../common/models/transactionLine');

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

          await Transaction.create({
            transactionId: transaction.transactionId,
            period: transaction.period,
            transactionDate: transaction.transactionDate,
            sourceId: transaction.sourceId,
            description: transaction.description,
            glPostingDate: transaction.glPostingDate,
            docArchivalNumber: transaction.docArchivalNumber,
            customerId: transaction.customerId,
            supplierId: transaction.supplierId,
            journalId: journal.journalId
          });
          if (transaction.lines !== undefined) {
            await Lines(transaction.lines, transaction);
          }
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
          customerId: transactions.customerId,
          supplierId: transactions.supplierId,
          journalId: journal.journalId
        });
        if (transactions.lines !== undefined) {
          await Lines(transactions.lines, transactions);
        }
      }
    }
  }
}

async function Lines(lines, transaction) {
  let credit = jp.query(lines, '$.creditLine')[0];
  let debit = jp.query(lines, '$.debitLine')[0];
  if (credit instanceof Array) {
    for (i in credit) {
      let c = credit[i];
      await TransactionLine.create({
        type: 'credit',
        recordId: c.recordId,
        accountId: c.accountId,
        description: c.description,
        amount: c.creditAmount,
        sourceDocumentId: c.sourceDocumentId,
        systemEntryDate: c.systemEntryDate,
        transactionId: transaction.transactionId
      });
    }
  } else {
    await TransactionLine.create({
      type: 'credit',
      recordId: credit.recordId,
      accountId: credit.accountId,
      description: credit.description,
      amount: credit.creditAmount,
      sourceDocumentId: credit.sourceDocumentId,
      systemEntryDate: credit.systemEntryDate,
      transactionId: transaction.transactionId
    });
  }
  if (debit instanceof Array) {
    for (i in debit) {
      let d = debit[i];
      await TransactionLine.create({
        type: 'debit',
        recordId: d.recordId,
        accountId: d.accountId,
        description: d.description,
        amount: d.debitAmount,
        sourceDocumentId: d.sourceDocumentId,
        systemEntryDate: d.systemEntryDate,
        transactionId: transaction.transactionId
      });
    }
  } else {
    await TransactionLine.create({
      type: 'debit',
      recordId: debit.recordId,
      accountId: debit.accountId,
      description: debit.description,
      amount: debit.debitAmount,
      sourceDocumentId: debit.sourceDocumentId,
      systemEntryDate: debit.systemEntryDate,
      transactionId: transaction.transactionId
    });
  }
}
module.exports = {
  seed
};
