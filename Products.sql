
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS features CASCADE;
DROP TABLE IF EXISTS products_features CASCADE;
DROP TABLE IF EXISTS related_products CASCADE;
DROP TABLE IF EXISTS styles CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS skus CASCADE;

CREATE TABLE products (
  productId serial PRIMARY KEY,
  name VARCHAR ( 225 ) NOT NULL,
  slogan VARCHAR ( 225 ) NOT NULL,
  description VARCHAR ( 1000 ) NOT NULL,
  category VARCHAR ( 225 ) NOT NULL,
  defaultPrice VARCHAR ( 225 ) NOT NULL
);

CREATE TABLE features (
  featureId serial PRIMARY KEY,
  feature VARCHAR ( 50 ),
  value VARCHAR ( 50 )
);

CREATE TABLE products_features (
  productId serial,
  featureId serial,
  FOREIGN KEY (featureId) REFERENCES features (featureId),
  FOREIGN KEY (productId) REFERENCES products (productId)
);


CREATE TABLE related_products (
  id serial PRIMARY KEY,
  productId serial,
  related_product_id INT NOT NULL,
  FOREIGN KEY (productId) REFERENCES products (productId)
);

CREATE TABLE styles (
  productId serial,
  style_id serial PRIMARY KEY,
  name VARCHAR ( 50 ) NOT NULL,
  orignal_price VARCHAR ( 50 ) NOT NULL,
  sale_price VARCHAR ( 50 ),
  default_pirce BOOLEAN,
  FOREIGN KEY (productId) REFERENCES products (productId)
);

CREATE TABLE photos (
  style_id serial,
  photo_id serial PRIMARY KEY,
  thumbnail_url VARCHAR ( 225 ) NOT NULL,
  url VARCHAR ( 225 ) NOT NULL,
  FOREIGN KEY (style_id) REFERENCES styles (style_id)
);

CREATE TABLE skus (
  style_id serial,
  skus_id INT NOT NULL,
  quantity INT NOT NULL,
  size VARCHAR ( 50 ),
  FOREIGN KEY (style_id) REFERENCES styles (style_id)
);
