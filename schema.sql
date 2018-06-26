DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

DROP TABLE IF EXISTS products;
CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INT(12) NOT NULL,
    stock_quantity INT(12) NOT NULL,
    PRIMARY KEY (item_id)
)


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bar Stool", "Furniture", 30, 10), ("iphone x", "Digital", 900, 40), ("Macbook pro", "Digital", 1900, 34), ("Coffee Table", "Furniture", 60, 80), ("Coffee", "Food", 30, 1300);

SELECT * FROM products;