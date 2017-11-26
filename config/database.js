const { Client } = require('pg');

module.exports = () => {
  const client = new Client(process.env.DATABASE_URL);

  client.connect();

  return client;
};
