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
connection.query = util.promisify(connection.query);
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
  const data = await connection.query("SELECT * FROM employees");
  console.table(data);
  initialPrompt();
}
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
//----------View All Departments
function viewAllDepartments() {
  connection.query("SELECT * FROM departments", function (err, data) {
    if (err) throw err;
    console.table(data);
    initialPrompt();
  });
}

//-------Update functions--------
//-------Update Employee's Role/title--------
async function updateEmployeeRole() {
  const empArr = await connection.query(
    "SELECT id, first_name, last_name FROM employees"
  );
  const rolesArr = await connection.query("SELECT title, id from roles");
  const { employee, updateRole } = await inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: "Select employee to be updated.",
      choices: empArr.map((employees) => ({
        name: employees.first_name + " " + employees.last_name,
        value: employees.id,
      })),
    },
    {
      type: "list",
      name: "updateRole",
      message: "What is the employee's new title?",
      choices: rolesArr.map((roles) => ({
        name: roles.title,
        value: roles.id,
      })),
    },
  ]);

  await connection.query("UPDATE employees SET role_id = ? WHERE id = ?", [
    {
      role_id: updateRole,
    },
    {
      id: employee,
    },
  ]);
  viewAllEmployees();
}

//-------Update Employee's Manager--------
async function updateEmployeeMgmt() {
  const empArr = await connection.query("SELECT * FROM employees");
  // const manArr = await connection.query("SELECT id from ")
  // viewEmployeeMgmt();
  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "employeeNumber",
        message: "Select employee to be updated by their ID.",
        choices: [empArr],
      },
      {
        type: "rawlist",
        name: "updateManager",
        message: "Who is the employee's new manager?",
        choices: ["George Bluth", "Michael Bluth"],
      },
    ])
    .then((data) => {
      // const
      connection.query("UPDATE employees SET manager_id = ? WHERE  id = ?", [
        data.updateManager,
        data.employeeNumber,
      ]);
    });
}

//-------Add functions--------
async function addEmployee() {
  const rolesArr = await connection.query("SELECT id, title FROM roles");
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "roleId",
        message: "What is their role?",
        choices: rolesArr.map((roles) => roles.title),
      },
    ])
    .then((data) => {
      connection.query("INSERT INTO employees SET ?", {
        first_name: data.firstName,
        last_name: data.lastName,
        // role_id: data.rolesArr.filter((roles) => roleId === roles.title)[0].id,
        role_id: data.rolesArr.filter(roles.title)[0].id,
      });
      console.log("Data inserted successfully!");
      viewAllEmployees();
    });
}

async function addRole() {
  const deptArr = await connection.query("SELECT id, name FROM departments");
  const { newTitle, newSalary, dept } = await
  inquirer
    .prompt([
      {
        type: "input",
        name: "newTitle",
        message: "What is the role's title?",
      },
      {
        type: "input",
        name: "newSalary",
        message: "What is the salary for this title?",
      },
      {
        type: "list",
        name: "dept",
        message: "Which department does this role reside in?",
        choices: deptArr.map((departments) => departments.name),
      },
    ])
    await
      connection.query("INSERT INTO roles SET ?", {
        title: newTitle,
        salary: newSalary,
        department_id: dept,
        department_id: deptArr.filter(
          (departments) => dept === departments.name
        )[0].id,
      });
      console.log("Data inserted successfully!");
      viewAllRoles();
    ;
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
      viewAllDepartments();
    });
}

//----------Remove Functions------------
function removeEmployee() {
  const data = connection.query("SELECT * FROM employees");
  console.table(data);
  inquirer
    .prompt([
      {
        type: "input",
        name: "employee",
        message: "Enter the Employee ID of the person to remove:",
      },
    ])
    .then((data) => {
      connection.query(`DELETE FROM employees WHERE id = ?`);
      console.table(data);
    });
}

function removeDept() {
  const data = connection.query("SELECT * FROM departments");
  console.table(data);
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Enter the Department ID you want to remove:",
      },
    ])
    .then((data) => {
      connection.query(`DELETE FROM departments WHERE id = ?`);
      console.table(data);
    });
}

function removeRole() {
  const data = connection.query("SELECT * FROM roles");
  console.table(data);
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "Enter the ROle ID of the roles to be removed:",
      },
    ])
    .then((data) => {
      connection.query(`DELETE FROM roles WHERE id = ?`);
      console.table(data);
    });
}
