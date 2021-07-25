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
       (1, "HR-Assistant", 5000),
       (2, "Upper leadership", 8000),
       (2, "Supervisor", 45000),
       (3, "Payroll-personnel", 5000),
       (4, "Safety personnel I", 55000),
       (4, "Safety personnel II", 5000);