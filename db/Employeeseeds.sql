USE employeetracker_db;

--Mapping out seeds / data for the dapartment table--

INSERT INTO department (name)
VALUE ("Human Resources");
INSERT INTO department (name)
VALUE ("Leadership");
INSERT INTO department (name)
VALUE ("Payroll");
INSERT INTO department (name)
VALUE ("Safety");

--Mapping out seeds for various roles--

INSERT INTO role (department_id, title, salary)
VALUES (1, "HR-Manager", 75000),
       (1, "HR-Assistant", 50000),
       (2, "Upper leadership", 80000),
       (2, "Supervisor", 45000),
       (3, "Payroll-personnel", 50000),
       (4, "Safety personnel I", 55000),
       (4, "Safety personnel II", 50000);

--Mapping out seeds for employee table--

INSERT INTO employee (role_id, manager_id, first_name, last_name)
VALUES (1, null, "Ishya", "Cas"),
        (1, null, "Jenn", "Good"),
        (2, null, "Anjeh", "M."),
        (2, null, "Ange", "Lowe"),
        (3, null, "Anam", "Braz"),
        (4, null, "Bruno", "Calder"),
        (4, null, "Marie", "Rae");