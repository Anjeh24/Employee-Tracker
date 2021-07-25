DROP DATABASE IF EXISTS department_db;

CREATE DATABASE department_db;
USE department_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department(
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(30),
    
);

DROP DATABASE IF EXISTS role_db;

CREATE DATABASE role_db;
USE role_db;

DROP TABLE IF EXISTS role;
CREATE TABLE role(
id INT PRIMARY KEY NOT NULL,
title VARCHAR(30),
salary DECIMAL,
department_id INT

);

DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;
USE employee_db;

DROP TABLE IF EXISTS employee;
CREATE TABLE employee(
id INT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
manager_id INT
);

