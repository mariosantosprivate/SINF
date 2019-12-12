const Journal = require('../../../common/models/journal');
const Transaction = require('../../../common/models/transaction');
const TransactionsLines = require('../../../common/models/transactionLine');
const getMonth = require('date-fns/getMonth');
const Sequelize = require('sequelize');
const ativo = require('../../utils/ativo');
const negativos = ativo.negativo_corrente.join().split(',');
const positivos = ativo.positivo_corrente_credito.join().split(',');
const positivos_debito = ativo.positivo_corrente_debito.join().split(',');
const positivos_credito = ativo.positivo_corrente_credito.join().split(',');

//const Op = Sequelize.Op;

async function calculate(fiscalYear) {
  let revenuePerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  fiscalYear = parseInt(fiscalYear);
  const transactions = await TransactionsLines.findAll({
    attributes: ['amount', 'type', 'accountId', 'systemEntryDate'],
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
    let Value = 0;
    let transaction = transactions[i];
    let positive = check(transaction.accountId, positivos);
    let negative = check(transaction.accountId, negativos);
    //Daremos sempre priorirdade nos calculos aqueles que forem buscar melhor os SNC
    // Ou seja, se houver 2 e 24 noutro, o 24 terá como prioridade
    if (positive !== undefined && negative !== undefined) {
      if (negative.length > positive.length) positive = undefined;
      else if (negative.length < positive.length) negative = undefined;
    }
    if (positive !== undefined) {
      let positive_debito = check(transaction.accountId, positivos_debito);
      let positive_corrente_credito = check(
        transaction.accountId,
        positivos_credito
      );
      if (
        positive_corrente_credito !== undefined &&
        positive_debito !== undefined
      ) {
        if (positive_debito.length > positive_corrente_credito.length)
          positive_corrente_credito = undefined;
        else if (positive_debito.length < positive_corrente_credito.length)
          positive_debito = undefined;
      }
      if (transaction.type == 'debit' && positive_debito !== undefined)
        Value += transaction.amount;
      else if (
        transaction.type == 'credit' &&
        positive_corrente_credito !== undefined
      )
        Value += transaction.amount;
    } else if (negative !== undefined) {
      if (transaction.type == 'credit') {
        Value -= transaction.amount;
      }
    }

    const month = getMonth(new Date(transaction.systemEntryDate));

    revenuePerMonth[month] += Value;
    totalValue += Value;
  }
  revenuePerMonth = revenuePerMonth.map(value => Number(value.toFixed(2)));

  return revenuePerMonth;
}

function check(accountId, array) {
  if (accountId.length <= 3) {
    return array.find(element => accountId == element);
  } else {
    return array.find(element => accountId.startsWith(element));
  }
}

module.exports = calculate;
