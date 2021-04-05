USE employeeTrackerDB;

INSERT INTO departments (name, budget_total)
VALUES ("Sales", 225000),
("Public Relations", 575000),
("Realty", 125000),
("Legal", 755000);

INSERT INTO roles (title, salary, department_id)
VALUES ("Mr. Manager", 5000, 1),
("Home Builder", 80000, 2),
("Board Member", 120000, 4),
("Magician", 4000, 2),
("Prisoner", 1200, 4),
("Freeloader", 24000, 3);

INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES 
("George Michael", "Bluth", 2, 1),
("Michael", "Bluth", 1, 2),
("George", "Bluth", null, 5),
("Lucille", "Bluth", null, 3),
("Gob", "Bluth", null, 4),
("Buster", "Bluth", 2, 6),
("Maeby", "Funke", 1, 1),
("Tobias", "Funke", null, 6),
("Lindsay", "Funke", 2, 3);

