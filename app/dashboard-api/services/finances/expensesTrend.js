const journal = require('../../../common/models/journal');
const transaction = require('../../../common/models/transaction');
const transactionLine = require('../../../common/models/transactionLine');

function checkAccountCode(accountId) {
  // materialCostCodes = ['611', '612', '613'];
  // employeesCostCodes = ['631', '632', '6331', '6332', '634', '635', '636', '637', '638'];
  const codes = ['611', '612', '613', '631', '632', '6331', '6332', '634', '635', '636', '637', '638'];

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
            model: journal,
            where: { fiscalYear },
          },
        ],
      },
    ],
  });

  if (!transactionLines) throw new Error(`There is no expenses transaction lines for the fiscal year ${fiscalYear}`);

  // sum the ammount of every transaction line for each month
  const expensesPerMonth = [];
  for (let i = 0; i < 12; i += 1) {
    let expenses = 0;
    let t = 0;
    for (t in transactionLines) {
      if (transactionLines[t] !== undefined && checkAccountCode(transactionLines[t].accountId)) {
        const date = new Date(transactionLine[t].systemEntryDate);
        const month = date.getMonth();
        if (month === i) {
          expenses += transactionLines[t].ammount;
        }
      }
    }
    expensesPerMonth[i] = parseFloat(expenses);
  }

  return expensesPerMonth;
}

module.exports = calculate;
