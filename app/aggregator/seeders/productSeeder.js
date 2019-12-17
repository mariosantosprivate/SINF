const jp = require('jsonpath');
const axios = require('../requests/axios');
const Product = require('../../common/models/product');

async function seedFromSaft(data) {
  const products = jp.query(data, '$.auditFile.masterFiles.product')[0];

  for (const key in products) {
    if (Object.prototype.hasOwnProperty.call(products, key)) {
      const product = products[key];

      await Product.upsert({
        code: product.productCode,
        description: product.porductDescription,
        group: product.productGroup,
        numberCode: product.productNumberCode,
        type: product.ProductType,
      });
    }
  }
}

async function seedFromJasmin() {
  const axiosInstance = axios.getInstance();

  const request = await axiosInstance.get('businesscore/items');
  const products = request.data;

  for (const product of products) {
    // upsert is used here to avoid SequelizeUniqueConstraintError
    // due to duplicate entries
    await Product.upsert({
      code: product.itemKey,
      description: product.description,
      group: product.assortment,
      numberCode: product.barCode,
      type: product.itemType,
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
