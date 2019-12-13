const Journal = require('../../../common/models/journal');
const Transaction = require('../../../common/models/transaction');
const TransactionsLines = require('../../../common/models/transactionLine');
const Sequelize = require('sequelize');
const getMonth = require('date-fns/getMonth');
const positivos = [
  716, // 510
  721, // 513
  722, // 514
  723, // 515
  724, // 515
  727, // 515
  725, // 516
  726 // 517
];
const negativos = [
  712, // 507
  711, // 506
  713, // 508
  714, // 509
  717, // 511
  718, // 512
  728 // 518
];
const Op = Sequelize.Op;
async function calculate(fiscalYear) {
  let revenuePerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  fiscalYear = parseInt(fiscalYear);
  const transactions = await TransactionsLines.findAll({
    attributes: ['amount', 'type', 'accountId', 'systemEntryDate'],
    include: [
      {
        model: Transaction,
        attributes: [],
        include: [
          {
            model: Journal,
            attributes: []
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
  for (i in transactions) {
    let Value = 0;
    let transaction = transactions[i];
    let positive = check(transaction.accountId, positivos);
    let negative = check(transaction.accountId, negativos);
    if (positive !== undefined && negative !== undefined) {
      if (negative.length > positive.length) positive = undefined;
      else if (negative.length < positive.length) negative = undefined;
    }
    if (positive !== undefined) {
      if (transaction.type == 'debit') {
        Value += transaction.amount;
      } else {
        Value -= transaction.amount;
      }
    } else if (negative !== undefined) {
      if (transaction.type == 'credit') {
        Value += transaction.amount;
      } else {
        Value -= transaction.amount;
      }
    }
    const month = getMonth(new Date(transaction.systemEntryDate));
    revenuePerMonth[month] += Value;
  }
  revenuePerMonth = revenuePerMonth.map(value => Number(value.toFixed(2)));

  return revenuePerMonth;
}

function check(accountId, array) {
  return array.find(element => accountId.startsWith(element));
}
module.exports = calculate;
