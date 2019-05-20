DROP DATABASE IF EXISTS camazonInventory;
CREATE DATABASE camazonInventory;

USE camazonInventory;

CREATE TABLE products(
    item_id INTEGER(28)
    AUTO_INCREMENT NOT NULL,
    
    product_name VARCHAR
    (30) NOT NULL,
  
    department_name VARCHAR
    (30) NOT NULL,
    
    price DECIMAL
    (11,4) NOT NULL,
    
    stock_quantity INTEGER
    (28) NOT NULL,
    PRIMARY KEY
    (item_id)
);

SELECT * FROM camazonInventory.products;

USE camazonInventory;