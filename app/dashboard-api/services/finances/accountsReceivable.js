const Journal = require('../../../common/models/journal');
const Transactions = require('../../../common/models/transaction');
const TransactionsLines = require('../../../common/models/transactionLine');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function calculate(fiscalYear) {
  const transactions = await TransactionsLines.findAll({
    include: [
      {
        model: Transactions,
        where: { customerId: { [Op.ne]: null } },
        include: [
          {
            model: Journal,
            where: { fiscal_year: fiscalYear }
          }
        ]
      }
    ],
    raw: true,
    where: { type: 'credit' }
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
    if (transaction.type == 'debit') {
      totalValue -= transaction.amount;
    } else {
      totalValue += transaction.amount;
    }
  }
  return parseFloat(totalValue);
}

module.exports = calculate;
