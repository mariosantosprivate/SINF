const journal = require('../../../common/models/journal');
const transaction = require('../../../common/models/transaction');
const transactionLine = require('../../../common/models/transactionLine');

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
      `There is no expenses transaction lines for the fiscal year ${fiscalYear}`
    );

  // sum the ammount of every transaction line
  let expenses = 0;
  let i = 0;
  for (i in transactionLines) {
    if (
      transactionLines[i] !== undefined &&
      checkAccountCode(transactionLines[i].accountId)
    ) {
      if (transactionLines[i] == 'debit') {
        expenses -= transactionLines[i].amount;
      } else {
        expenses += transactionLines[i].amount;
      }
    }
  }

  return parseFloat(expenses);
}

module.exports = calculate;
