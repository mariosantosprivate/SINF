const Journal = require('../../../common/models/journal');
const Transaction = require('../../../common/models/transaction');
const TransactionsLines = require('../../../common/models/transactionLine');
const Sequelize = require('sequelize');
const nums = require('../../utils/equity');
const equity = nums.numeros.join().split(',');
const Op = Sequelize.Op;

async function calculate(fiscalYear) {
  fiscalYear = parseInt(fiscalYear);
  const transactions = await TransactionsLines.findAll({
    include: [
      {
        model: Transaction,
        include: [
          {
            model: Journal
          }
        ]
      }
    ],
    raw: true,
    where: {
      '$Transaction.Journal.fiscal_year$': fiscalYear
    }
  }).catch(function(err) {
    return err;
  });
  if (!transactions)
    throw new Error(
      `There is no general ledger information for the fiscal year ${fiscalYear}`
    );
  let totalValue = 0;
  for (i in transactions) {
    transaction = transactions[i];
    if (
      equity.find(element => transaction.accountId.startsWith(element)) !==
      undefined
    ) {
      if (transaction.type == 'debit') {
        totalValue -= transaction.amount;
      } else if (transaction.type == 'credit') {
        totalValue += transaction.amount;
      }
    }
  }
  return totalValue;
}

module.exports = calculate;
