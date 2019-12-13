const Sequelize = require('sequelize');
const journal = require('../../../common/models/journal');
const transaction = require('../../../common/models/transaction');
const transactionLine = require('../../../common/models/transactionLine');

async function calculate(fiscalYear) {
  // get all transactionLines where accountId starts with 212 and
  // which journal's fiscal year matches the fiscal year
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
      accountId: { [Sequelize.Op.startsWith]: '222' },
    },
  });

  if (!transactionLines) throw new Error(`There is no transaction lines with accountId that starts with 222 for the fiscal year ${fiscalYear}`);

  // sum the ammount of every transaction line
  let value = 0;
  let i = 0;
  for (i in transactionLines) {
    if (transactionLines[i] !== undefined) {
      value += transactionLines[i].ammount;
    }
  }

  return parseFloat(value);
}

module.exports = calculate;
