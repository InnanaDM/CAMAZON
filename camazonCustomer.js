require('dotenv').config();
const mysql = require('mysql');
const prompt = require('prompt');
const colors = require('colors/safe');
const Table = require('cli-table');
const inquirer = require('inquirer');


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE 
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('\n   connected to database. \n');
	createTable();
});


function createTable() {
    connection.query('SELECT * FROM products', function (err, res) {
        console.table(res, ['item_id', 'product_name', 'price', 'stock_quantity']);
        promptCustomer(res);


    });
}

function promptCustomer(res) {
	inquirer.prompt([{
        type: 'input',
        name: 'selection',
        message: 'provide ID of item you would like to buy. [ E to exit ]'
    }]).then(function (answer) {
		var validInput = false;

		if (answer.selection.toUpperCase() === 'E') {
            console.log('exiting...');
            process.exit();
		}
		for (var i = 0; i < res.length; i++) {
            if (res[i].item_id === parseInt(answer.selection)) {
                validInput = true;
                promptQuantity(res[i], res);
                break;
            }
		}
		
		if (!validInput) {
            console.log('no item found');
            promptCustomer(res);
        }

    })
}

function promptQuantity(product, productList) {
    inquirer.prompt({
        type: 'input',
        name: 'quantity',
        message: 'How many units of product would you like to buy?'
    }).then(function (answer) {

		if (product.stock_quantity >= answer.quantity) {
            connection.query('UPDATE products SET stock_quantity="' + (product.stock_quantity - answer.quantity) + '", product_sales="' + (product.product_sales + answer.quantity * product.price) + '" WHERE item_id="' + product.item_id + '"', function () {
                connection.query('UPDATE departments SET total_sales=total_sales+' + (answer.quantity * product.price) + ' WHERE department_name="' + product.department_name + '"', function () {
                    console.log('\n  Purchased ' + answer.quantity + ' of item "' + product.product_name + '" for $' + ((answer.quantity * product.price).toFixed(2)) + '. \n')
                });
                createTable();
            })
		}
		else if (product.stock_quantity < answer.quantity) {
            console.log('There are ' + product.stock_quantity + ' remaining in Camazon inventory. Cannot complete request.');
            promptCustomer(productList);
        }
	});
	
}