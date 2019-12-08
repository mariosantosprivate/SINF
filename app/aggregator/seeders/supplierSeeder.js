const jp = require('jsonpath');
const Supplier = require('../../common/models/supplier');
const addressStructure = require('../../common/models/addressStructure');

async function seed(data) {
  const suppliers = jp.query(data, '$.auditFile.masterFiles.supplier')[0];

  for (const key in suppliers) {
    if (Object.prototype.hasOwnProperty.call(suppliers, key)) {
      const supplier = suppliers[key];

      const { billingAddress } = supplier;
      const { shipFromAddress } = supplier;
      await Supplier.create({
        supplierId: supplier.supplierId,
        supplierTaxId: supplier.supplierTaxId,
        companyName: supplier.companyName,
        contact: supplier.contact,
        telephone: supplier.telephone,
        fax: supplier.fax,
        email: supplier.email,
        website: supplier.website
      });

      if (billingAddress !== undefined) {
        await addressStructure.create({
          buildingNumber: billingAddress.buildingNumber,
          streetName: billingAddress.streetName,
          addresDetail: billingAddress.addresDetail,
          city: billingAddress.city,
          postalCode: billingAddress.postalCode,
          region: billingAddress.region,
          country: billingAddress.country,
          billingAddress: supplier.supplierId
        });
      }
      if (shipFromAddress !== undefined) {
        await addressStructure.create({
          buildingNumber: shipFromAddress.buildingNumber,
          streetName: shipFromAddress.streetName,
          addresDetail: shipFromAddress.addresDetail,
          city: shipFromAddress.city,
          postalCode: shipFromAddress.postalCode,
          region: shipFromAddress.region,
          country: shipFromAddress.country,
          shipToAddress: supplier.supplierId
        });
      }
    }
  }
}

module.exports = {
  seed
};
