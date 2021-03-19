
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS features CASCADE;
DROP TABLE IF EXISTS products_features CASCADE;
DROP TABLE IF EXISTS related_products CASCADE;
DROP TABLE IF EXISTS styles CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS skus CASCADE;

CREATE TABLE products (
  product_id serial PRIMARY KEY,
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
  product_id serial,
  featureId serial,
  FOREIGN KEY (featureId) REFERENCES features (featureId),
  FOREIGN KEY (product_id) REFERENCES products (product_id)
);


CREATE TABLE related_products (
  id serial PRIMARY KEY,
  product_id serial,
  related_product_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products (product_id)
);

CREATE TABLE styles (
  product_id serial,
  style_id serial PRIMARY KEY,
  name VARCHAR ( 50 ) NOT NULL,
  orignal_price VARCHAR ( 50 ) NOT NULL,
  sale_price VARCHAR ( 50 ),
  default_price BOOLEAN,
  FOREIGN KEY (product_id) REFERENCES products (product_id)
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


CREATE INDEX product_id_index ON products_features (product_id);
CREATE INDEX featureId_index ON products_features (featureId);
CREATE INDEX product_id_related_index ON related_products (product_id);
CREATE INDEX product_id__styles_index ON styles (product_id);
CREATE INDEX photos_styles_id_index ON photos (style_id);
CREATE INDEX skus_styles_id_index ON skus (style_id);