const axios = require('axios');
const qs = require('query-string');
const tokenStorage = require('./tokenStorage');

async function getToken() {
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
    tokenStorage.token = response.data.access_token;
  } catch (err) {
    console.log(err.response.data);
  }
}

module.exports = getToken;
