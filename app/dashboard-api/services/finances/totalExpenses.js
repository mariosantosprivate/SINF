const journal = require('../../../common/models/journal');
const transaction = require('../../../common/models/transaction');
const transactionLine = require('../../../common/models/transactionLine');

async function calculate(fiscalYear) {
  // get all transactionLines of type debit and which journal's fiscal year matches the fiscal year
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
    where: {
      type: 'debit',
    },
  });

  if (!transactionLines) throw new Error(`There is no debit transaction lines for the fiscal year ${fiscalYear}`);

  // sum the ammount of every transaction line
  let debit = 0;
  let i = 0;
  for (i in transactionLines) {
    if (transactionLines[i] !== undefined) {
      debit += transactionLines[i].ammount;
    }
  }

  // or get GeneralLedgesEntries by fiscal year and get totalDebit

  return parseFloat(debit);
}

module.exports = calculate;
