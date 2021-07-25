DROP DATABASE IF EXISTS department_db;

CREATE DATABASE department_db;
USE department_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department(
    id INT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

DROP DATABASE IF EXISTS role_db;

CREATE DATABASE role_db;
USE role_db;

DROP TABLE IF EXISTS role;
CREATE TABLE role(
id INT NOT NULL,
title VARCHAR(30),
salary DECIMAL,
FOREIGN KEY(department_id)
);



