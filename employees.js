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
//mananger id...
function managerView() {
  var query =
    "SELECT id, first_name, last_name FROM Employee WHERE id IN (SELECT manager_id FROM employee WHERE manager_id IS NOT NULL)";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].first_name + " " + res[i].last_name + " || Id: " + res[i].id
      );
    }

    runSearch();
  });
}

//adding an employeee
function employeeAdd() {
  inquirer
    .prompt({
      name: "employeeAdd",
      type: "input",
      message: ["To ADD an employee, enter Employee First Name then Last Name"]
    })

    .then(function(answer) {
      console.log(answer);
      var str = answer.employeeAdd;
      var firstAndLastName = str.split(" ");
      console.log(firstAndLastName);
      var query = "INSERT INTO employee (first_name, last_name) VALUES ?";
      connection.query(query, [[firstAndLastName]], function(err, res) {
        runSearch();
      });
    });
}

//adding a dpartment...
function departmentAdd() {
  inquirer
    .prompt({
      name: "departmentAdd",
      type: "input",
      message: ["To ADD a department, enter new department name"]
    })

    .then(function(answer) {
      console.log(answer);
      var str = answer.employeeAdd;
      var firstAndLastName = str.split(" ");
      console.log(firstAndLastName);
      var query = "INSERT INTO employee (first_name, last_name) VALUES ?";
      connection.query(query, [[firstAndLastName]], function(err, res) {
        runSearch();
      });
    });
}

// add role title, salary, department id
function roleAdd() {
  inquirer
    .prompt({
      name: "title",
      type: "input",
      message: ["Enter new role name"]
    })
    .then(function(answer) {
      var title = answer.title;

      inquirer
        .prompt({
          name: "salary",
          type: "input",
          message: ["Enter new role salary"]
        })
        .then(function(answer) {
          var salary = answer.salary;

          inquirer
            .prompt({
              name: "department_id",
              type: "input",
              message: ["Enter new role department id"]
            })
            .then(function(answer) {
              var department_id = answer.department_id;

              console.log(
                `title: ${title} salary: ${salary} department id: ${department_id}`
              );

              var query =
                "INSERT INTO role (title, salary, department_id) VALUES ?";
              connection.query(
                query,
                [[[title, salary, department_id]]],
                function(err, res) {
                  if (err) {
                    console.log(err);
                  }

                  runSearch();
                }
              );
            });
        });
    });
}
//remove an employee
function removeEmployee() {
  inquirer
    .prompt({
      name: "employeeRemove",
      type: "input",
      message: "To REMOVE an employee, enter the Employee id"
    })
    .then(function(answer) {
      console.log(answer);
      var query = "DELETE FROM employee WHERE ?";
      var newId = Number(answer.employeeRemove);
      console.log(newId);
      connection.query(query, { id: newId }, function(err, res) {
        runSearch();
      });
    });
}
//update employee info
function employeeUpdate() {
  console.log("updating emp");
  inquirer
    .prompt({
      name: "id",
      type: "input",
      message: "Enter employee id"
    })
    .then(function(answer) {
      var id = answer.id;

      inquirer
        .prompt({
          name: "roleId",
          type: "input",
          message: "Enter role id"
        })
        .then(function(answer) {
          var roleId = answer.roleId;

          var query = "UPDATE employee SET role_id=? WHERE id=?";
          connection.query(query, [roleId, id], function(err, res) {
            if (err) {
              console.log(err);
            }
            runSearch();
          });
        });
    });
}
