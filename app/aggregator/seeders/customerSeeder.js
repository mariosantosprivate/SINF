const jp = require('jsonpath');
const Customer = require('../models/customer');

async function seed(data) {
  const customers = jp.query(data, '$.auditFile.masterFiles.customer')[0];

  for (i in customers) {
    const customer = customers[i];
    
    await Customer.create({
      customerId: customer.customerId,
      companyName: customer.companyName
    });
  }
}

module.exports = {
  seed
}