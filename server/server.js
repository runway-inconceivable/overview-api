const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const db = require('../database');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());

const relatedProducts = (rows) => rows.map((product) => product.related_product_id);

app.get('/products/:params/related', (req, res) => {
  const sql = `SELECT * FROM related_products WHERE product_id = ${params}`;
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.send(relatedProducts(data.rows));
    }
  });
});



app.get('/products/:params/styles', (req, res) => {
  const { params } = req.params;
  const photosNested = `SELECT
  styles.style_id, styles.name, styles.original_price, styles.sale_price, styles.default_price,
  JSON_AGG(json_build_object(
    'url', url,
    'thumbnail_url', thumbnail_url
    )) AS photos
  FROM
  styles
  INNER JOIN photos
  ON (styles.style_id = photos.style_id) WHERE (styles.product_id = ${params})
  GROUP BY
  styles.style_id
  ;`;

  const skusQuery = `SELECT skus.skus_id, skus.quantity, skus.size FROM skus WHERE skus.style_id = 5;`;

  db.query(photosNested, (err, data) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      console.log(data.rows);
      res.send(data.rows);
    }
  });
});

// db.query(photosNested, (err, productAndPhotoData) => {
//   if (err) {
//     console.log(err);
//     res.send(500);
//   } else {
//     db.query(skusQuery, (err, skusData) => {
//       if (err) {
//         console.log(err);
//         res.send(500);
//       } else {

//       }
//      });
//    };
//   });


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
