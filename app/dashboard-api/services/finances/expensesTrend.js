const journal = require('../../../common/models/journal');
const transaction = require('../../../common/models/transaction');
const transactionLine = require('../../../common/models/transactionLine');
const getMonth = require('date-fns/getMonth');

function checkAccountCode(accountId) {
  // materialCostCodes = ['611', '612', '613'];
  // employeesCostCodes = ['631', '632', '6331', '6332', '634', '635', '636', '637', '638'];
  const codes = [
    '611',
    '612',
    '613',
    '631',
    '632',
    '6331',
    '6332',
    '634',
    '635',
    '636',
    '637',
    '638'
  ];

  for (const i in codes) {
    if (accountId.startsWith(codes[i])) {
      return true;
    }
  }

  return false;
}

async function calculate(fiscalYear) {
  const expensesPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // get all transactionLines from material cost and employees payments
  // and which journal's fiscal year matches the fiscal year
  const transactionLines = await transactionLine.findAll({
    raw: true,
    include: [
      {
        model: transaction,
        include: [
          {
            model: journal
          }
        ]
      }
    ],
    where: {
      '$Transaction.Journal.fiscal_year$': fiscalYear
    }
  });

  if (!transactionLines)
    throw new Error(
      `There is no Value transaction lines for the fiscal year ${fiscalYear}`
    );

  // sum the ammount of every transaction line for each month
  let t = 0;
  for (t in transactionLines) {
    let Value = 0;
    if (
      transactionLines[t] !== undefined &&
      checkAccountCode(transactionLines[t].accountId)
    ) {
      const month = getMonth(new Date(transactionLines[t].systemEntryDate));
      if (transactionLines[t] == 'debit') {
        Value -= transactionLines[t].amount;
      } else {
        Value += transactionLines[t].amount;
      }
      expensesPerMonth[month] += Value;
    }
  }

  return expensesPerMonth;
}

module.exports = calculate;
