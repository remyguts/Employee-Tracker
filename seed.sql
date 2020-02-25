INSERT INTO department (department_name)
VALUES ("recording"), ("mixing"), ("reproduction");

INSERT INTO roles (title_role, salary, department_id)
VALUES ("recordingmanager" ,10000 ,1), ("mixingmanager", 150000, 2), ("repromanager", 10000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Skip","Johnson", 1, null), ("John","Holmes", 1, 1), ("Mike", "d", 2, null), ("Peter", "North", 2, 1), ("Ron", "Jeremy", 3, null), ("James", "Whales",3, 1)


