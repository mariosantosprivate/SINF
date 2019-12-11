const Journal = require('../../../common/models/journal');
const Transaction = require('../../../common/models/transaction');
const TransactionsLines = require('../../../common/models/transactionLine');
const Sequelize = require('sequelize');
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
      accountId: { [Op.startsWith]: '21' },
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
    if (transaction.type == 'credit') {
      totalValue -= transaction.amount;
    } else {
      totalValue += transaction.amount;
    }
  }
  return parseFloat(totalValue);
}

module.exports = calculate;
