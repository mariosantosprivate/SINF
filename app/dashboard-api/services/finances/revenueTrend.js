const Journal = require('../../../common/models/journal');
const Transaction = require('../../../common/models/transaction');
const TransactionsLines = require('../../../common/models/transactionLine');
const Sequelize = require('sequelize');
const clientes_debito = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
const clientes_negativo = [];
const getMonth = require('date-fns/getMonth');
const Op = Sequelize.Op;

async function calculate(fiscalYear) {
  let revenuePerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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
      accountId: { [Op.startsWith]: '211' },
      '$Transaction.Journal.fiscal_year$': fiscalYear
    }
  }).catch(function(err) {
    return err;
  });
  if (!transactions)
    throw new Error(
      `There is no general ledger information for the fiscal year ${fiscalYear}`
    );
  for (i in transactions) {
    let Value = 0;
    transaction = transactions[i];
    if (transaction.type == 'debit') {
      Value += transaction.amount;
    }
    const month = getMonth(new Date(transaction.systemEntryDate));

    revenuePerMonth[month] += Value;
  }
  return revenuePerMonth;
}

module.exports = calculate;
