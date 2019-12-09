const jp = require('jsonpath');
const StockMovement = require('../../common/models/stockMovement');
const ShippingInfo = require('../../common/models/shippingInfo');

async function seed(data) {
  const { fiscalYear } = data.auditFile.header;

  let stockMovements = jp.query(data, '$.auditFile.sourceDocuments.movementOfGoods.stockMovement')[0];

  if (!stockMovements) return;

  if (!Array.isArray(stockMovements)) { stockMovements = [stockMovements]; }


  for (const key in stockMovements) {
    if (Object.prototype.hasOwnProperty.call(stockMovements, key)) {
      const stockMovement = stockMovements[key];

      const shipTo = await ShippingInfo.create({
        deliveryDate: stockMovement.shipTo.deliveryDate,
        addressDetail: stockMovement.shipTo.address.addressDetail,
        city: stockMovement.shipTo.address.city,
        postalCode: stockMovement.shipTo.address.postalCode,
        country: stockMovement.shipTo.address.country,
      });

      const shipFrom = await ShippingInfo.create({
        deliveryDate: stockMovement.shipFrom.deliveryDate,
        addressDetail: stockMovement.shipFrom.address.addressDetail,
        city: stockMovement.shipFrom.address.city,
        postalCode: stockMovement.shipFrom.address.postalCode,
        country: stockMovement.shipFrom.address.country,
      });

      await StockMovement.create({
        documentNumber: stockMovement.documentNumber,
        movementDate: stockMovement.movementDate,
        movementType: stockMovement.movementType,
        taxPayable: stockMovement.documentTotals.taxPayable,
        netTotal: stockMovement.documentTotals.netTotal,
        grossTotal: stockMovement.documentTotals.grossTotal,
        fiscal_year: fiscalYear,
        customer_id: stockMovement.customerId,
        ship_to_info_id: shipTo.id,
        ship_from_info_id: shipFrom.id,
      });
    }
  }
}

module.exports = {
  seed,
};
