const jp = require('jsonpath');
const Customer = require('../../common/models/customer');
const axios = require('../requests/axios');


async function seedFromSaft(data) {
  let customers = jp.query(data, '$.auditFile.masterFiles.customer')[0];

  if (!Array.isArray(customers)) customers = [customers];

  for (const key in customers) {
    if (Object.prototype.hasOwnProperty.call(customers, key)) {
      const customer = customers[key];

      await Customer.upsert({
        customerId: customer.customerId,
        companyName: customer.companyName,
      });
    }
  }
}

async function seedFromJasmin(data) {
  const axiosInstance = axios.getInstance();

  const request = await axiosInstance.get(`salesCore/customerParties/`);
  const customers = request.data.items;

  for (const key in customers) {
    if (Object.prototype.hasOwnProperty.call(customers, key)) {
      const customer = customers[key];

      await Customer.create({
        customerId: customer.partyKey + "." + customer.companyTaxID,
        companyName: customer.companyTaxID,
      });
    }
  }
}

async function seed(data) {
  await seedFromSaft(data);
  // await seedFromJasmin(data);
}

module.exports = {
  seed,
};
