const Journal = require('../../../common/models/journal');
const Transaction = require('../../../common/models/transaction');
const TransactionsLines = require('../../../common/models/transactionLine');
const Sequelize = require('sequelize');
const ativo = require('../../utils/ativo');
const negativos = ativo.negativo_naoCorrente.join().split(',');
const positivos = ativo.positivo_naoCorrente.join().split(',');
const positivos_debito = ativo.positivo_naoCorrente_debito.join().split(',');
//const positivos_credito = ativo.positivo_corrente_credito.join().split(',');
const saldosDevedor = {};
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
    let devedor = check(transaction.accountId, positivos_debito);
    if (positive !== undefined && negative !== undefined) {
      if (negative.length > positive.length) positive = undefined;
      else if (negative.length < positive.length) negative = undefined;
    }
    if (
      (positive !== undefined || negative !== undefined) &&
      devedor !== undefined
    ) {
      if (positive === undefined) {
        if (negative.length > devedor.length) negative = undefined;
        else if (negative.length < devedor.length) devedor = undefined;
      } else {
        if (positive.length > devedor.length) positive = undefined;
        else if (positive.length < devedor.length) devedor = undefined;
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
    } else if (devedor !== undefined) {
      if (transaction.type == 'debit') {
        saldosDevedor[parseInt(devedor)] += transaction.amount;
      } else {
        saldosDevedor[parseInt(devedor)] -= transaction.amount;
      }
    }
  }
  for (i in saldosDevedor) {
    saldo = saldosDevedor[i];
    if (saldo > 0) {
      totalValue += saldo;
    }
  }
  return parseFloat(totalValue.toFixed(2));
}

function check(accountId, array) {
  return array.find(element => accountId.startsWith(element));
}

module.exports = calculate;
