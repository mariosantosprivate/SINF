const jp = require('jsonpath');
const axios = require('../requests/axios');
const Supplier = require('../../common/models/supplier');
const addressStructure = require('../../common/models/addressStructure');

async function seedFromSaft(data) {
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
        website: supplier.website,
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
          billingAddress: supplier.supplierId,
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
          shipToAddress: supplier.supplierId,
        });
      }
    }
  }
}

async function seedFromJasmin() {
  const axiosInstance = axios.getInstance();

  const request = await axiosInstance.get('purchasesCore/supplierParties');
  const suppliers = request.data;

  for (const supplier of suppliers) {
    // upsert is used here to avoid SequelizeUniqueConstraintError
    // due to duplicate entries
    await Supplier.upsert({
      supplierId: supplier.partyKey,
      companyName: supplier.name,
      contact: supplier.contactName,
      telephone: supplier.telephone,
      email: supplier.electronicMail,
      website: supplier.websiteUrl,
    });
  }
}

async function seed(data) {
  await seedFromSaft(data);
  await seedFromJasmin();
}

module.exports = {
  seed,
};
