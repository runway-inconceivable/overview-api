const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const db = require('../database');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());

const relatedProducts = (rows) => rows.map((product) => product.related_product_id);

app.get('/products/:product_id/related', (req, res) => {
  const { product_id } = req.params;
  const sql = `SELECT * FROM related_products WHERE product_id = ${product_id}`;
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.send(relatedProducts(data.rows));
    }
  });
});

app.get('/products/:product_id/styles', async (req, res) => {
  const { product_id } = req.params;
  const photosNested = `SELECT
  styles.style_id, styles.name, styles.original_price, styles.sale_price, styles.default_price,
  JSON_AGG(json_build_object(
    'url', url,
    'thumbnail_url', thumbnail_url
    )) AS photos
  FROM
  styles
  INNER JOIN photos
  ON (styles.style_id = photos.style_id)
  WHERE (styles.product_id = $1)
  GROUP BY
  styles.style_id

  ;`;

  const skusQuery = `SELECT skus.skus_id, skus.quantity, skus.size FROM skus WHERE skus.style_id = $1;`;
  try {
    const styleData = await db.query(photosNested, [product_id]);
    const addSkuToStyle = async (style) => {
      const skusData = await db.query(skusQuery, [style.style_id]);
      const skus = {};
      skusData.rows.forEach((sku) => {
        const skusId = sku.skus_id;
        skus[skusId] = {
          quanity: sku.quantity,
          size: sku.size,
        };
      });

      return {
        style_id: style.style_id,
        name: style.name,
        sale_price: style.sale_price,
        'default?': style.default_price,
        photos: style.photos,
        skus,
      };
    };


    const getStyleSkus = async () => Promise.all(styleData.rows.map((style) => addSkuToStyle(style)));
    getStyleSkus().then((styleResults) => {
      const styleIdResponse = {
        product_id,
        results: styleResults,
      };
      res.send(styleIdResponse);
    });



  } catch (err) {
    console.log(err.stack);
    res.sendStatus(500);
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
