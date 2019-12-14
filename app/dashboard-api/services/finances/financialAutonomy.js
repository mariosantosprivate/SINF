const Journal = require('../../../common/models/journal');
const Transaction = require('../../../common/models/transaction');
const TransactionsLines = require('../../../common/models/transactionLine');
const Sequelize = require('sequelize');
const equity = require('../../utils/equity');
const devedoresECredores = equity.devedoresECredores.join().split(',');
const positivos = equity.positivos.join().split(',');
const negativos = equity.negativos.join().split(',');
//const positivos_credito = ativo.positivo_corrente_credito.join().split(',');
const saldosDevedoresECredores = {};
//const Op = Sequelize.Op;

async function calculate(fiscalYear) {
  fiscalYear = parseInt(fiscalYear);
  const transactions = await TransactionsLines.findAll({
    attributes: ['amount', 'type', 'accountId'],
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
  let totalValue = 0;
  for (i in transactions) {
    let transaction = transactions[i];
    let positive = check(transaction.accountId, positivos);
    let negative = check(transaction.accountId, negativos);
    let debitAndCredit = check(transaction.accountId, devedoresECredores);
    // This ifs are needed to check if it is to sum credit or debit amount, or subtract
    // Bigger priority number is used. Which means if devedor is 852 and positive is 85 p.e
    // We will use devedor function because devedor got a better match than positive
    if (positive !== undefined && negative !== undefined) {
      if (negative.length > positive.length) positive = undefined;
      else if (negative.length < positive.length) negative = undefined;
    }
    if (
      (positive !== undefined || negative !== undefined) &&
      debitAndCredit !== undefined
    ) {
      if (positive === undefined) {
        if (negative.length > debitAndCredit.length) negative = undefined;
        else if (negative.length < debitAndCredit.length)
          debitAndCredit = undefined;
      } else {
        if (positive.length > debitAndCredit.length) positive = undefined;
        else if (positive.length < debitAndCredit.length)
          debitAndCredit = undefined;
      }
    }
    if (positive !== undefined) {
      if (transaction.type == 'debit') {
        totalValue += transaction.amount;
      } else {
        totalValue -= transaction.amount;
      }
    } else if (negative !== undefined) {
      if (transaction.type == 'credit') {
        totalValue += transaction.amount;
      } else {
        totalValue -= transaction.amount;
      }
    } else if (debitAndCredit !== undefined) {
      if (!saldosDevedoresECredores[parseInt(debitAndCredit)]) {
        saldosDevedoresECredores[parseInt(debitAndCredit)] = 0;
      }
      if (transaction.type == 'debit') {
        saldosDevedoresECredores[parseInt(debitAndCredit)] +=
          transaction.amount;
      } else {
        saldosDevedoresECredores[parseInt(debitAndCredit)] -=
          transaction.amount;
      }
    }
  }
  for (i in saldosDevedoresECredores) {
    saldo = saldosDevedoresECredores[i];
    // - se devedores, + se credor
    if (saldo > 0) {
      totalValue -= saldo;
    } else {
      totalValue += saldo;
    }
    saldosDevedoresECredores[i] = 0;
  }
  return parseFloat(totalValue.toFixed(2));
}

function check(accountId, array) {
  return array.find(element => accountId.startsWith(element));
}

module.exports = calculate;
