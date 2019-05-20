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
