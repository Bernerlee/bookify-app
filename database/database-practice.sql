CREATE TABLE services (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10, 2),
  category VARCHAR(100)
)

INSERT INTO services (name, price, category)
VALUES ('Haircut', 50.00, 'Hair');

INSERT INTO (name, price, category)
VALUES ('Shaving', 30.00, 'Hair');


SELECT * FROM services;

SELECT price FROM services;

UPDATE services
SET price = 65.00
WHERE id = 1;

UPDATE services
SET price = 50.00
WHERE id = 2;

DELETE services
WHERE id = 1;


CREATE TABLE customers (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE appointments (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  service VARCHAR(100) NOT NULL,
  status VARCHAR(30) DEFAULT 'pending',

  FOREIGN KEY (customer_id)
  REFERENCES customers(id)
)

INSERT INTO customers(name, email)
VALUES ('john', 'john@gmail.com');

INSERT INTO customers(name, email)
VALUES ('sarah', 'sarah@gmail.com');

-- customers_id is a foreign key because it is not generated from appointment table.
-- The relationship that exists between customers and appointments is via the customer_id column which contains
-- id from customers and such it is referred to as a foreign key, it connects both tables.

