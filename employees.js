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

//function case/break using inquirer
function runSearch() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all departments",
        "View all managers",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Exit"
      ]
    })
    .then(function(answer) {
      console.log(answer.action);
      switch (answer.action) {
        case "View all employees":
          employeeView();
          break;

        case "View all departments":
          departmentView();
          break;

        case "View all managers":
          managerView();
          break;

        case "Add Employee":
          employeeAdd();
          break;

        case "Add Department":
          departmentAdd();
          break;

        case "Add Role":
          roleAdd();
          break;

        case "Remove Employee":
          employeeRemove();
          break;

        case "Update Employee Role":
          employeeUpdate();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

//create next inquiry for employee search by name
function employeeView() {
  inquirer
    .prompt({
      name: "employeeView",
      type: "input",
      message: "What employee would you like to search for (by last name)?"
    })
    .then(function(answer) {
      var query = "SELECT first_name, last_name, id FROM employee WHERE ?";
      connection.query(query, { last_name: answer.employeeView }, function(
        err,
        res
      ) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "First Name: " +
              res[i].first_name +
              " || Last name: " +
              res[i].last_name +
              " || Id: " +
              res[i].id
          );
        }

        runSearch();
      });
    });
}
//department query
function departmentView() {
  var query = "SELECT name FROM department";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].name);
    }
  });
}
