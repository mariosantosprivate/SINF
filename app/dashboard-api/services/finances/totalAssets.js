const Journal = require('../../../common/models/journal');
const Transaction = require('../../../common/models/transaction');
const TransactionsLines = require('../../../common/models/transactionLine');
const Sequelize = require('sequelize');
const ativo = require('../../utils/ativo');
const negativos = ativo.negativos.join().split(',');
const positivos = ativo.positivos.join().split(',');
const positivos_debito = ativo.positivos_debito.join().split(',');
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
  for (i in transactions) {
    let transaction = transactions[i];
    let positive = check(transaction.accountId, positivos);
    let negative = check(transaction.accountId, negativos);
    if (positive !== undefined && negative !== undefined) {
      if (negative.length > positive.length) positive = undefined;
      else if (negative.length < positive.length) negative = undefined;
    }
    if (positive !== undefined) {
      if (check(transaction.accountId, positivos_debito) !== undefined) {
        if (transaction.type == 'debit') totalValue += transaction.amount;
      } else {
        if (transaction.type == 'credit') totalValue += transaction.amount;
      }
    } else if (negative !== undefined) {
      if (transaction.type == 'debit') {
        totalValue -= transaction.amount;
      }
    }
  }
  return totalValue;
}

function check(accountId, array) {
  if (accountId.length <= 3) {
    return array.find(element => accountId == element);
  } else {
    return array.find(element => accountId.startsWith(element));
  }
}

module.exports = calculate;
