# bamazon
This is an Amazon-like command line project. It allows customer place order, print out the receipt and reduce the quantity of sold product. 

### How to install:

* Install Node.js and npm in your laptop.
* In your terminal clone this repository to run the application
* After download, in your terminal, run "npm install" inside the bamazon folder that has package.json to install dependend packages.
* You'll also need to set up a sql database using the schema.sql file and set the Port, Username and password in the bamazoneCustomer.js file

### How to use bamazon
* **node bamazonCustomer.js**
    * This will print the id, name, and price of all products and ask customer what they want to buy.
    * After enter the product's id and quantity, it will print a receipt.
    * If the product's quantity is not enough, it will say "Insufficient quantity!".
    * Customer can hit "control + c"  to exit the program at any time or wait until a purchase is done.


![alt text](https://raw.github.com/karimifar/bamazon/master/a.gif)

![alt text](b.gif?raw=true)


### Built With  

* Javascript 
* Node.js: mysql and inquirer
* MySql database server


### Authors

* **Em Karimifar** 

