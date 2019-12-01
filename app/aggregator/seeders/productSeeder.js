const jp = require('jsonpath');
const Product = require('../../common/models/product');

async function seed(data) {
  const products = jp.query(data, '$.auditFile.masterFiles.product')[0];

  for (i in products) {
    const product = products[i];
    
    await Product.create({
      code: product.productCode,
      description: product.porductDescription,
      group: product.productGroup,
      numberCode: product.productNumberCode,
      type: product.ProductType
    });
  }
}

module.exports = {
  seed
}