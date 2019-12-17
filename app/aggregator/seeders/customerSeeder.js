const jp = require('jsonpath');
const Customer = require('../../common/models/customer');

async function seed(data) {
  let customers = jp.query(data, '$.auditFile.masterFiles.customer')[0];

  if (!Array.isArray(customers)) customers = [customers];

  for (const key in customers) {
    if (Object.prototype.hasOwnProperty.call(customers, key)) {
      const customer = customers[key];

      await Customer.create({
        customerId: customer.customerId,
        companyName: customer.companyName,
      });
    }
  }
}

module.exports = {
  seed,
};
