const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  password: 'postgres',
  host: '52.32.133.18',
  database: 'postgres',
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
