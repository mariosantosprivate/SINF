const jp = require('jsonpath');
const MovementOfGoods = require('../models/movementOfGoods');

async function seed(data) {
  const fiscalYear = data.auditFile.header.fiscalYear;

  const movementsOfGoods = jp.query(data, '$.auditFile.sourceDocuments.movementOfGoods');

  for (i in movementsOfGoods) {
    const movementOfGoods = movementsOfGoods[i];
    
    await MovementOfGoods.create({
      fiscalYear: fiscalYear,
      numberOfMovementLines: movementOfGoods.numberOfMovementLines,
      totalQuantityIssued: movementOfGoods.totalQuantityIssued
    });
  }
}

module.exports = {
  seed
}