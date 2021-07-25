DROP DATABASE IF EXISTS department_db;

CREATE DATABASE department_db;
USE department_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department(
    id INT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);



