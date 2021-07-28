"use strict";

const inquirer = require("inquirer");
const db = require("./db/dbmethods");
const cTable = require(`console.table`);

function init() {
  optionPrompt();
}

("use strict");

const choice = [
  {
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: [
      {
        name: "View all employees",
        value: "VIEW_EMPLOYEES",
      },
      {
        name: "View all departments",
        value: "VIEW_DEPARTMENTS",
      },
      {
        name: "View all roles",
        value: "VIEW_ROLES",
      },
      {
        name: "Add an employee",
        value: "ADD_EMPLOYEE",
      },
      {
        name: "Add a role",
        value: "ADD_ROLE",
      },
      {
        name: "Add a department",
        value: "ADD_DEPARTMENT",
      },
      {
        name: "Update employee role",
        value: "UPDATE_EMPLOYEE_ROLE",
      },
      {
        name: "Update employee manager",
        value: "UPDATE_EMPLOYEE_MANAGER",
      },
      {
        name: "Delete an employee",
        value: "DELETE_EMPLOYEE",
      },
      {
        name: "Delete a role",
        value: "DELETE_ROLE",
      },
      {
        name: "Delete a department",
        value: "DELETE_DEPARTMENT",
      },
      {
        name: "View Department Budget",
        value: "VIEW_BUDGET",
      },
      {
        name: "EXIT",
        value: "EXIT",
      },
    ],
  },
];

async function optionPrompt() {
  const answer = await inquirer.prompt(choice);

  switch (answer.choice) {
    case "VIEW_EMPLOYEES":
      return viewEmployees();
    case "VIEW_DEPARTMENTS":
      return viewDepartments();
    case "VIEW_ROLES":
      return viewRoles();
    case "ADD_EMPLOYEE":
      return addEmployee();
    case "ADD_DEPARTMENT":
      return addDepartment();
    case "ADD_ROLE":
      return addRole();
    case "UPDATE_EMPLOYEE_ROLE":
      return updateRole();
    case "DELETE_EMPLOYEE":
      return deleteEmployee();
    case "DELETE_DEPARTMENT":
      return deleteDepartment();
    case "DELETE_ROLE":
      return deleteRole();
    case "VIEW_BUDGET":
      return viewDepartmentBudget();
    case "UPDATE_EMPLOYEE_MANAGER":
      return updateEmployeeManager();
    case "EXIT":
      process.exit();
  }
}

// view functions
async function viewEmployees() {
  const res = await db.viewAllEmployees();
  console.table("", res);
  optionPrompt();
}

async function viewDepartments() {
  const res = await db.viewAllDepartments();
  console.table("", res);
  optionPrompt();
}

async function viewRoles() {
  const res = await db.viewAllRoles();
  console.table("", res);
  optionPrompt();
}
// Add functions
async function addEmployee() {
  const roles = await db.findRoles();

  const roleList = roles.map((record) => {
    return record.title;
  });

  const employees = await db.findEmployee();

  const employeeList = employees.map((record) => {
    return record.first_name.concat(" " + record.last_name);
  });

  employeeList.unshift("None");

  const answer = await inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "What is the employee's first name?",
    },
    {
      name: "lastName",
      type: "input",
      message: "What is the employee's last name?",
    },
    {
      name: "role",
      type: "list",
      message: "What is the employee's role?",
      choices: roleList,
    },
    {
      name: "manager",
      type: "list",
      message: "What is their manager's name?",
      choices: employeeList,
    },
  ]);

  let managerId;
  if (answer.manager !== "None") {
    const managerRecord = employees.find(
      (resultEntry) =>
        answer.manager === resultEntry.first_name + " " + resultEntry.last_name
    );

    managerId = managerRecord.id;
  }
  const roleRecord = roles.find(
    (resultEntry) => resultEntry.title === answer.role
  );
  const roleId = roleRecord.id;

  await db.addEmployee(answer.firstName, answer.lastName, roleId, managerId);

  console.log(`Added ${answer.firstName} to the database.`);
  optionPrompt();
}

async function addDepartment() {
  const answer = await inquirer.prompt({
    name: "department",
    type: "input",
    message: "What department would you like to add?",
  });

  const res = await db.addDepartment(answer.department);

  console.log(`Added ${answer.department} to the the database.`);
  optionPrompt();
}

async function deleteEmployee() {
  const employees = await db.findEmployee();

  const employeeList = employees.map(({ id, first_name, last_name }) => ({
    value: id,
    name: `${id} ${first_name} ${last_name}`,
  }));

  const answer = await inquirer.prompt({
    type: "list",
    name: "employeeId",
    message: "Which employee do you want to remove?",
    choices: employeeList,
  });
  const res = await db.deleteEmployee(answer.employeeId);
  console.log("Employee Deleted");
  optionPrompt();
}

async function deleteDepartment() {
  const dept = await db.findDepartment();

  const departmentChoices = dept.map(({ id, name }) => ({
    value: id,
    name: `${id} ${name}`,
  }));

  const answer = await inquirer.prompt({
    type: "list",
    name: "deptId",
    message: "Which department do you want to remove?",
    choices: departmentChoices,
  });
  const res = await db.deleteEmployee(answer.deptId);
  console.log("Department Deleted");
  optionPrompt();
}

async function deleteRole() {
  const roles = await db.findRoles();
  const deleteRoleChoices = roles.map(({ id, title }) => ({
    value: id,
    name: `${id} ${title}`,
  }));

  const answer = await inquirer.prompt({
    type: "list",
    name: "roleId",
    message: "Which role do you want to remove?",
    choices: deleteRoleChoices,
  });
  const res = await db.deleteRole(answer.roleId);
  console.log("Role Deleted");
  optionPrompt();
}

async function viewDepartmentBudget() {
  const res = await db.findBudget();
  res.forEach((department) => {
    console.log(
      `Department: ${department.name}\n Budget: ${department.budget}\n`
    );
  });
  optionPrompt();
}

async function addRole() {
  const answer = await inquirer.prompt([
    {
      name: "role",
      type: "input",
      message: "What role would you like to add?",
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary for that role?",
    },
  ]);

  const res = await db.addRole(answer.role, answer.salary);
  console.log(`Added ${answer.role} to the the database.`);
  optionPrompt();
}
async function updateRole() {
  const employees = await db.findEmployee();

  const employeeList = employees.map((record) => {
    return record.first_name.concat(" " + record.last_name);
  });

  const roles = await db.findRoles();

  const roleList = roles.map((record) => {
    return record.title;
  });

  const answer = await inquirer.prompt([
    {
      name: "name",
      type: "list",
      message: "Which employee do you want to update?",
      choices: employeeList,
    },
    {
      name: "role",
      type: "list",
      message: "What is the employee's updated role?",
      choices: roleList,
    },
  ]);

  const employeeChoice = employees.find(
    (resultEntry) =>
      answer.name === resultEntry.first_name + " " + resultEntry.last_name
  );

  const employeeId = employeeChoice.id;

  const roleRecord = roles.find(
    (resultEntry) => resultEntry.title === answer.role
  );
  const roleId = roleRecord.id;

  await db.updateEmployeeRole(roleId, employeeId);

  console.log(`Updated ${answer.name}'s role in the database.`);
  optionPrompt();
}

async function updateEmployeeManager() {
  // Select Employee to update
  let employees = [];
  const res = await db.findEmployee();
  res.forEach((element) => {
    employees.push(`${element.id} ${element.first_name} ${element.last_name}`);
  });
  const answer = await inquirer.prompt([
    {
      name: "update",
      type: "list",
      message: "Which employee Manager do you want to update?",
      choices: employees,
    },
    {
      name: "manager",
      type: "list",
      message: "Select the Manager",
      choices: employees,
    },
  ]);

  let idCode = parseInt(answer.update);
  let managerCode = parseInt(answer.manager);
  const response = await db.updateEmpManager(managerCode, idCode);
  console.log("\n" + "\n" + response.affectedRows + " Updated successfully!");
  optionPrompt();
}

init();
