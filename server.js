const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_trackerDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  connection.end();
});

function initialPrompt() {
  inquirer.prompt([
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
      ],
    },
  ])
  .then(data => {
    switch(data.decide){
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

      default:
        console.log("");
    }
  })
}
//--------View functions---------
function viewAllEmployees(){
  //
}
function viewAllRoles(){
    //
}
function viewEmployeeDept(){
  //
}
function viewEmployeeMgmt(){
  //
}
function viewBudgetTotal(){
    //
}



//-------Add functions--------
function addEmployee(){
    //
}
function addRole(){
  //
}
function addDept(){
    //
}



//-------Updatefunctions--------
function updateEmployeeRole(){
    //
}
function updateEmployeeMgmt(){
    //
}



//--------Remove functions--------
function removeEmployee(){
    //
}
function removeRole(){
    //
}
function removeDept(){
    //
}