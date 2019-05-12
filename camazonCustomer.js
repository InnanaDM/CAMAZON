const mysql = require('mysql');
const prompt = require('prompt');
const colors = require('colors/safe');
const Table = require('cli-table');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'surfer03',
	database: 'CAMAZON', 
});