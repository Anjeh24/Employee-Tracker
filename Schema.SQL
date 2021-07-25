DROP DATABASE IF EXISTS employeetracker_db;

CREATE DATABASE employeetracker_db;
USE employeetracker_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    
);





DROP TABLE IF EXISTS role;
CREATE TABLE role(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
REFERENCES department(id) FOREIGN KEY(department_id)
);



DROP TABLE IF EXISTS employee;
CREATE TABLE employee(
id INT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT
FOREIGN KEY(role_id) REFERENCES role(id),
FOREIGN KEY(manager_id) REFERENCES employee(id)
);

