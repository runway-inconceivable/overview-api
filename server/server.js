const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const db = require('../database');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());

const relatedProducts = (rows) => rows.map((product) => product.related_product_id);

app.get('/products/:20345/related', (req, res) => {
  const sql = 'SELECT * FROM related_products WHERE productId = 20345';
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.send(relatedProducts(data.rows));
    }
  });
});

const returnStylesArray = (id) => {
  const sql = `SELECT * FROM styles WHERE productId = ${id}`;
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data.rows);
  });
};

app.get('/products/:20345/styles', (req, res) => {
  res.send(returnStylesArray(20345));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
