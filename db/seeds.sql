USE employeeTrackerDB;

INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES 
("George Michael", "Bluth", 1, 1),
("Michael", "Bluth", null, 2),
("George", "Bluth", null, 2),
("Lucille", "Bluth", null, 3),
("Gob", "Bluth", null, 3)

INSERT INTO roles (title, salary, department_id)
VALUES ("Mr. Manager", 5000, 1),
("Home Builder", 80000, 2),
("Board Member", 120000, 3),
("Magician", 4000, 4)
("Prisoner", 1200, 5)

INSERT INTO departments (name, budget_total)
VALUES ("Sales", 225000),
("Public Relations", 575000),
("Legal", 755000),
