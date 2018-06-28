var mysql = require("mysql");
var inquirer = require("inquirer");
var divider= " | ";
var productList = "";
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

var allIds = [];

connection.connect(function(err){
    if (err) throw err;
    setTimeout(start, 500);
})


function start(){

    inquirer.prompt([{
            name: "productID",
            type: "input",
            message: "Which product do you want to buy? (enter ID)",
            validate: function(value) {
                if (isNaN(value) === false && allIds.indexOf(parseInt(value)) != -1) {
                  return true;
                }
                return false;
              }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        }

    ]).then(function(answers){
        var prodId = parseInt(answers.productID);
        var wantedQuant = parseInt(answers.quantity);
        
        connection.query("SELECT * FROM products WHERE item_id="+prodId , function(err, res){
            if(err) throw err;
            var theThing= res[0].product_name; 
            var stockQuant = res[0].stock_quantity;
            var prodPrice = res[0].price;
            var total = prodPrice * wantedQuant;
            if(wantedQuant > stockQuant){
                console.log("=================\n\nInsufficient quantity! we only have "+ stockQuant +" of " + theThing + " in our stock\n\n=================" );
                endPrompt();
            }else{
                var leftQuant = stockQuant - wantedQuant;
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [leftQuant, prodId], function(err, res){
                    if (err) throw err;
                    console.log( "=================\n\nYour "+ theThing +" purchase was successful!!\n---\nYour total is: $" + total + "\n\n==================" )
                    endPrompt();
                })
            }
        })

    })
}
function endPrompt(){
    inquirer.prompt({
        name: "dowhat",
        message: "What else do you want to do now?",
        type: "list",
        choices: ["Quit", "Purchase another item"]
    }).then(function(answer){
        if (answer.dowhat === "Quit"){
            console.log("=================\n\nOkay Bye!!!\n\n=================")
            process.exit()
        }else{
            getList();
            setTimeout(start, 500);
        }
    })
}
function getList(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        productList = "=================\n\nThis is the list of our products today! (the first number is the product id)\n"
        for(var i=0; i<res.length; i++){
            productList +=  res[i].item_id + divider + res[i].product_name + divider + "$"+parseFloat(res[i].price) + "\n";
            allIds.push(res[i].item_id)
        }
        console.log(productList+"\n=================")
    });
}

getList();