const { Pool } = require('pg');

const client = new Pool({
  user: 'postgres',
  password: 'yP6qU4fB8qH9gU4fK5xZ0zV2oW5jQ0aF',
  host: '172.31.35.114',
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
