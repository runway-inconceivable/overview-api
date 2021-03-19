const { Client } = require('pg');

const client = new Client({
  user: 'samsparks',
  host: 'localhost',
  database: 'products',
  port: 5432,
});

client.connect((error) => {
  if (error) {
    console.log('db connect error', error);
  } else {
    console.log('connect to db');
  }
});

module.exports = client;
