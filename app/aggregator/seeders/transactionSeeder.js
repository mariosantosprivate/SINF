const jp = require('jsonpath');
const Transaction = require('../../common/models/trasaction');

async function seed(data) {
    const journalid = 1;

    const transactions = jp.query(data, '$.auditFile.sourceDocuments.transactions');

    for (i in transactions) {
        const transaction = transactions[i];

        await Transaction.create({
            transactionID: transaction.transactionID,
            period: transaction.period,
            transactionDate: transaction.transactionDate,
            sourceID: transaction.sourceID,
            description: transaction.description,
            GLPostingDate: transaction.GLPostingDate,
            customerID: transaction.customerID,
            supplierID: transaction.supplierID,
            journal_id: journalid
        });
    }
}

module.exports = {
    seed
}