"use strict";
//create dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// create connection with server
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "otis1978",
  database: "employees_db"
});

// throw errors
connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

//
