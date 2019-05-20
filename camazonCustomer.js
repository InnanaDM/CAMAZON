require('dotenv').config;
const mysql = require('mysql');
const prompt = require('prompt');
const colors = require('colors/safe');
const Table = require('cli-table');

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
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
        message: 'Please provide ID of the item you would like to buy. [ E to exit ]'
    }]).then(function (answer) {
		var validInput = false;

		if (answer.selection.toUpperCase() === 'E') {
            console.log('exiting...');
            process.exit();
        }
