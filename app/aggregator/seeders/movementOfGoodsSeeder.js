const jp = require('jsonpath');
const MovementOfGoods = require('../../common/models/movementOfGoods');

async function seed(data) {
  const { fiscalYear } = data.auditFile.header;

  const movementsOfGoods = jp.query(data, '$.auditFile.sourceDocuments.movementOfGoods');

  for (const key in movementsOfGoods) {
    if (Object.prototype.hasOwnProperty.call(movementsOfGoods, key)) {
      const movementOfGoods = movementsOfGoods[key];

      await MovementOfGoods.create({
        fiscalYear,
        numberOfMovementLines: movementOfGoods.numberOfMovementLines,
        totalQuantityIssued: movementOfGoods.totalQuantityIssued,
      });
    }
  }
}

module.exports = {
  seed,
};
