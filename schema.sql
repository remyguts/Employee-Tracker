Drop DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    department_name  VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    title_role VARCHAR(30) NOT NULL,
    salary DECIMAL (6,2),
    department_id INT default 0
);

CREATE TABLE    employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT default 0,
    manager_id INT default 0,

);




SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employees;

