const axios = require('axios');
const qs = require('query-string');

const token;

async function make() {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  const url = `${process.env.PRIMAVERA_IDENTITY_URL}/connect/token`;
  const requestBody = {
    grant_type: 'client_credentials',
    scope: 'application',
    client_id: process.env.JASMIN_CLIENT_ID,
    client_secret: process.env.JASMIN_CLIENT_SECRET
  }

  try {
    const response = await axios.post(url, qs.stringify(requestBody), config);
    token = response.access_token;
  } catch (err) {
    console.log(err.response.data);
  }
}

function token() {
  return token;
}

module.exports = {
  make,
  token
};
