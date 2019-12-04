const axios = require('axios');

let instance;

function createInstance(token) {
  instance = axios.create({
    baseURL: `${process.env.JASMIN_API_URL}/${process.env.JASMIN_ACCOUNT}/${process.env.JASMIN_SUBSCRIPTION}/`,
    headers: { Authorization: `Bearer ${token}` },
  });
}

function getInstance() {
  if (!instance) { instance = createInstance(); }

  return instance;
}

module.exports = {
  createInstance,
  getInstance,
};
