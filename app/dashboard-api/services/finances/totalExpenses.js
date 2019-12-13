const Sequelize = require('sequelize');
const journal = require('../../../common/models/journal');
const transaction = require('../../../common/models/transaction');
const transactionLine = require('../../../common/models/transactionLine');

async function calculate(fiscalYear) {
  const { Op } = Sequelize.Op;
  const materialCostCodes = ['611', '612', '613'];
  const employeesCostCodes = ['631', '632', '6331', '6332', '634', '635', '636', '637', '638'];
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
    where: {
      accountId: {
        [Op.or]: [
          { [Op.startsWith]: materialCostCodes[0] },
          { [Op.startsWith]: materialCostCodes[1] },
          { [Op.startsWith]: materialCostCodes[2] },
          { [Op.startsWith]: employeesCostCodes[0] },
          { [Op.startsWith]: employeesCostCodes[1] },
          { [Op.startsWith]: employeesCostCodes[2] },
          { [Op.startsWith]: employeesCostCodes[3] },
          { [Op.startsWith]: employeesCostCodes[4] },
          { [Op.startsWith]: employeesCostCodes[5] },
          { [Op.startsWith]: employeesCostCodes[6] },
          { [Op.startsWith]: employeesCostCodes[7] },
          { [Op.startsWith]: employeesCostCodes[8] },
        ],
      },
    },
  });

  if (!transactionLines) throw new Error(`There is no expenses transaction lines for the fiscal year ${fiscalYear}`);

  // sum the ammount of every transaction line
  let expenses = 0;
  let i = 0;
  for (i in transactionLines) {
    if (transactionLines[i] !== undefined) {
      expenses += transactionLines[i].ammount;
    }
  }

  // or get GeneralLedgesEntries by fiscal year and get totalDebit

  return parseFloat(expenses);
}

module.exports = calculate;
