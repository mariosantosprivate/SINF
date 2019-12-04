const jp = require('jsonpath');
const Supplier = require('../../common/models/suppplier');
const addressStructure = require('../../common/models/addressStructure');

async function seed(data) {
  const suppliers = jp.query(data, '$.auditFile.masterFiles.supplier')[0];

  for (const key in suppliers) {
    if (Object.prototype.hasOwnProperty.call(suppliers, key)) {
      const supplier = suppliers[key];

      const { billingAddress } = supplier;

      const billingAddressSaved = await addressStructure.create({
        buildingNumber: billingAddress.buildingNumber,
        streetName: billingAddress.streetName,
        addresDetail: billingAddress.addresDetail,
        city: billingAddress.city,
        postalCode: billingAddress.postalCode,
        region: billingAddress.region,
        country: billingAddress.country,
      });

      const shipToAddress = supplier.shipFromAddress;

      const shipToAddressSaved = await addressStructure.create({
        buildingNumber: shipToAddress.buildingNumber,
        streetName: shipToAddress.streetName,
        addresDetail: shipToAddress.addresDetail,
        city: shipToAddress.city,
        postalCode: shipToAddress.postalCode,
        region: shipToAddress.region,
        country: shipToAddress.country,
      });

      await Supplier.create({
        supplierId: supplier.supplierId,
        supplierTaxID: supplier.supplierTaxID,
        companyName: supplier.companyName,
        contact: supplier.contact,
        telephone: supplier.telephone,
        fax: supplier.fax,
        email: supplier.email,
        website: supplier.website,
        billingAddress: billingAddressSaved.id,
        shipToAddress: shipToAddressSaved.id,
      });
    }
  }
}

module.exports = {
  seed,
};
