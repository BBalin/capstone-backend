DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL,
  password text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  UNIQUE (username, email)
);

CREATE TABLE products (
  id serial PRIMARY KEY,
  name text NOT NULL,
  price decimal NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL
);

CREATE TABLE cart (
  id serial PRIMARY KEY,
  user_id integer REFERENCES users(id) ON DELETE CASCADE,
  created timestamp,
  updated timestamp
);

CREATE TABLE orders (
  id serial PRIMARY KEY, 
  user_id integer REFERENCES users(id) ON DELETE CASCADE,
  status text NOT NULL,
  total decimal NOT NULL, 
  created_at date NOT NULL
);

CREATE TABLE cart_items (
  id serial PRIMARY KEY,
  cart_id integer REFERENCES cart(id) ON DELETE CASCADE,
  product_id integer REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL
);

CREATE TABLE order_items (
  id serial PRIMARY KEY,
  order_id integer REFERENCES orders(id) ON DELETE CASCADE,
  product_id integer REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL,
  total decimal NOT NULL
);
