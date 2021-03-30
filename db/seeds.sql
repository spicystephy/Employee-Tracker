USE employeeTrackerDB;

INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES ("George Michael", "Bluth", 1, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Cashier", 5000, 1);

INSERT INTO departments (name, budget_total)
VALUES ("Sales", 500000);
