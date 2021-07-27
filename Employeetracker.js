const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
host: 'localhost',
port: 3306,
user: 'root',
password: '',
database: 'employeetracker_db',
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    trackerPrompts();
  });

  const trackerPrompts = () => {
    inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'view departments',
        'View names of all employees',
        'View roles',
        'Add new department',
        'Add new roles',
        'Add new employees',
        'Update employee roles',
        'exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View departments':
          viewDepts();
          break;

        case 'View names of all employees':
          viewEmp();
          break;

        case 'View roles':
          viewRol();
          break;

          case 'Add new department':
          addDepts();
          break;

          case 'Add new roles':
          addRol();
          break;

        case 'Add new employees':
          addNewemp();
          break;

          case 'Update employee roles':
          updateEmRo();
          break;

        case 'Exit':
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const viewDepts = () => {
    //connection.query allows you to execute sql statements( select, create database, insert into, update)
connection.query('SELECT * FROM deparment', function (err, results) {
    console.log(results);
    trackerPrompts();

  });
}
 const viewEmp = () => {
connection.query('SELECT * FROM employee', function (err, results) {
    console.log(results);
    trackerPrompts()
  });
}

const viewRol = () => {
    connection.query('SELECT * FROM role', function (err, results) {
        console.log(results);
        trackerPrompts;
      });
    }

  
