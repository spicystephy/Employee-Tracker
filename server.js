const inquirer = require("inquirer");
const mysql = require("mysql");
const util = require("util");

// const allRoles = ["Mr. Manager", "Home Builder", "Board Member", "Magician", "Prisoner", "Freeloader"];

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employeeTrackerDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
//   connection.end();
});
connection.query = util.promisify(connection.query)
initialPrompt();
function initialPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "decide",
        choices: [
          "View All Employees",
          "View Employees By Department",
          "View Employees By Manager",
          "Update Employee Manager",
          "Update Employee Role",
          "Add Employee",
          "Remove Employee",
          "View All Roles",
          "Add Role",
          "Remove Role",
          "Add Department",
          "Remove Department",
          "View Utilized Budget Total",
          "Exit",
        ],
      },
    ])
    .then((data) => {
      switch (data.decide) {
        case "View All Employees":
          viewAllEmployees();
          break;

        case "View Employees By Department":
          viewEmployeeDept();
          break;

        case "View Employees By Manager":
          viewEmployeeMgmt();
          break;

        case "Update Employee Manager":
          updateEmployeeMgmt();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "Add Role":
          addRole();
          break;

        case "Remove Role":
          removeRole();
          break;

        case "Add Department":
          addDept();
          break;

        case "Remove Department":
          removeDept();
          break;

        case "View Utilized Budget Total":
          viewBudgetTotal();
          break;

        case "Exit":
        //   connection.end();
          break;
      }
    });
}
//--------View functions---------
//--------View All Employees---------
async function viewAllEmployees() {
  const data = await connection.query("SELECT * FROM employees")
  console.table(data);
    initialPrompt();
  };
//--------View Employee by Department---------
function viewEmployeeDept() {
  connection.query(
    "SELECT first_name, last_name, department_id FROM employees JOIN roles ON employees.role_id = roles.id",
    function (err, data) {
      if (err) throw err;
      console.table(data);
      initialPrompt();
    }
  );
}
//--------View Employee by Manager---------
function viewEmployeeMgmt() {
  connection.query(
    "SELECT first_name, last_name, manager_id FROM employees",
    function (err, data) {
      if (err) throw err;
      console.table(data);
      initialPrompt();
    }
  );
}
//--------View All Roles---------
function viewAllRoles() {
  connection.query("SELECT * FROM roles", function (err, data) {
    if (err) throw err;
    console.table(data);
    initialPrompt();
  });
}
//-------Update functions--------
//-------Update Employee's Role/title--------
function updateEmployeeRole() {
  connection.query("SELECT id, role_id FROM employees");
  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeNumber",
        message: "Select employee to be updated by their ID.",
        choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      },
      {
        type: "rawlist",
        name: "updateRole",
        message: "What is the employee's new title?",
        choices: [
          "Mr. Manager",
          "Home Builder",
          "Board Member",
          "Magician",
          "Prisoner",
          "Freeloader",
        ],
      },
    ])
    .then((data) => {
      connection.query("UPDATE employees SET role_id = ? WHERE  id = ?", [
        data.updateRole,
        data.employeeNumber,
      ]);
    });
}

//-------Update Employee's Manager--------
function updateEmployeeMgmt() {
  connection.query("SELECT id, manager_id FROM employees");
  inquirer
    .prompt([
      {
        type: "l",
        name: "employeeNumber",
        message: "Select employee to be updated by their ID.",
        choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      },
      {
        type: "rawlist",
        name: "updateManager",
        message: "Who is the employee's new manager?",
        choices: ["George Bluth", "Michael Bluth"],
      },
    ])
    .then((data) => {
      connection.query("UPDATE employees SET manager_id = ? WHERE  id = ?", [
        data.updateManager,
        data.employeeNumber,
      ]);
    });
}

//-------Add functions--------
async function addEmployee() {
  const rolesArr = await connection.query("SELECT title, id FROM roles");
  const managerArr = await connection.query("SELECT manager_id, id FROM employees")
  const { firstName, lastName, manager_id, role_id } = await inquirer.prompt([
      {
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "rawlist",
        name: "manager_id",
        message: "Who is their manager?",
        choices: managerArr.map((manager) => manager.title),
      },
      {
        type: "rawlist",
        name: "role_id",
        message: "What is their role?",
        choices: rolesArr.map((role) => role.title),        
      },
    ])
      await connection.query("INSERT INTO employees SET ?", {
        first_name: firstName,
        last_name: lastName,
        manager_id: managerArr.filter((manager) => manager_id === manager.title) [0].id,
        role_id: rolesArr.filter((role) => role_id === role.title) [0].id
    });
      console.log("Data inserted successfully!");
      viewAllEmployees();
}

function addRole() {
  connection.query("SELECT * FROM roles");
  inquirer
    .prompt([
      {
        type: "input",
        name: "newTitle",
        message: "What is the role's title?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this title?",
      },
    ])
    .then((data) => {
      connection.query("INSERT INTO roles SET ?", {
        title: data.newTitle,
        salary: data.salary,
      });
      console.log("Data inserted successfully!");
      initialPrompt();
    });
}

function addDept() {
  connection.query("SELECT * FROM departments");
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDept",
        message: "What is the name of the department being added?",
      },
      {
        type: "input",
        name: "budget",
        message: "What is the total budget for this department?",
      },
    ])
    .then((data) => {
      connection.query("INSERT INTO departments SET ?", {
        name: data.newDept,
        budget_total: data.budget,
      });
      console.log("Data inserted successfully!");
      initialPrompt();
    });
}
