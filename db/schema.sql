DROP DATABASE IF EXISTS employeeTrackerDB;

CREATE DATABASE employeeTrackerDB;

USE employeeTrackerDB;

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT,
    employeeMgmt VARCHAR(45) NULL,
    employeeRole VARCHAR(45) NULL,
    employeeDept VARCHAR(45) NULL,
    allRoles VARCHAR(45) NULL,
    budgetTotal VARCHAR(45) NULL,
    PRIMARY KEY (id)
);