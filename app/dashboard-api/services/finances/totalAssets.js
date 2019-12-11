const Journal = require('../../../common/models/journal');
const Transaction = require('../../../common/models/transaction');
const TransactionsLines = require('../../../common/models/transactionLine');
const Sequelize = require('sequelize');
//const ativo = require('../../utils/ativo'); TOFIX
//const Op = Sequelize.Op;

async function calculate(fiscalYear) {
  fiscalYear = parseInt(fiscalYear);
  const transactions = await TransactionsLines.findAll({
    attributes: ['amount', 'type', 'accountId'],
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
      /*accountId: {
        [Op.or]: [
          {
            [Op.startsWith]: positivos.concat(negativos)
          }
        ]
      },*/

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
  const negativos = ativo.negativos.join().split(',');
  const positivos = ativo.positivos.join().split(',');
  for (i in transactions) {
    const transaction = transactions[i];
    const positive = positivos.find(element =>
      transaction.accountId.startsWith(element)
    );
    const negative = negativos.find(element =>
      transaction.accountId.startsWith(element)
    );
    if (positive !== undefined) {
      if (transaction.type == 'debit') {
        totalValue += transaction.amount;
      } else {
        totalValue -= transaction.amount;
      }
    } else if (negative !== undefined) {
      if (transaction.type == 'credit') {
        console.log(transaction);
        totalValue += transaction.amount;
      } else {
        console.log(transaction);
        totalValue -= transaction.amount;
      }
    }
  }
  return totalValue;
}

module.exports = calculate;
