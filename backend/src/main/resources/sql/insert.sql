INSERT INTO Promo(promo_name)
VALUES('I1'),
      ('I2'),
      ('P1'),
      ('P2'),
      ('A1'),
      ('A2'),
      ('A3');

INSERT INTO Student (first_name, last_name, email, password, promo_id)
VALUES ('John', 'Doe', 'student@student.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e', 1),
       ('Jane', 'Smith', 'jane.smith@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e', 2),
       ('Michael', 'Johnson', 'michael.johnson@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e', 3),
       ('Emily', 'Brown', 'emily.brown@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e', 4),
       ('David', 'Martinez', 'david.martinez@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e', 5),
       ('Sarah', 'Garcia', 'sarah.garcia@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e', 1),
       ('Daniel', 'Lopez', 'daniel.lopez@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e', 2),
       ('Jennifer', 'Rodriguez', 'jennifer.rodriguez@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e', 3),
       ('James', 'Wilson', 'james.wilson@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e', 4),
       ('Jessica', 'Lee', 'jessica.lee@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e', 5);

INSERT INTO Admin (first_name, last_name, email, password)
VALUES
    ('Admin', 'One', 'admin@admin.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
    ('Admin', 'Two', 'admin2@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
    ('Admin', 'Three', 'admin3@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e');

INSERT INTO Professor (first_name, last_name, email, password)
VALUES
    ('John', 'Smith', 'prof@prof.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
    ('Emily', 'Johnson', 'emily.johnson@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
    ('Michael', 'Brown', 'michael.brown@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e');

INSERT INTO Course (course_name)
VALUES
    ('Mathematics'),
    ('English'),
    ('Physics');

INSERT INTO Time_Table (student_id, course_id, time_start, time_end, room, campus, absent, minutes_late)
VALUES     (1, 1, '2024-05-15 08:00:00', '2024-05-15 10:00:00', 'N16A', 'NDC', true, 0),
           (1, 2, '2024-05-15 08:00:00', '2024-05-15 10:00:00', 'N16A', 'NDC', true, 0),
           (1, 3, '2024-05-15 08:00:00', '2024-05-15 10:00:00', 'N16A', 'NDC', true, 0),
           (1, 1, '2024-05-15 08:00:00', '2024-05-15 10:00:00', 'N16A', 'NDC', false, 10),
           (1, 2, '2024-05-15 08:00:00', '2024-05-15 10:00:00', 'N16A', 'NDC', false, 20),
           (1, 3, '2024-05-16 09:00:00', '2024-05-16 11:00:00', 'L12', 'NDL', false, 30);

INSERT INTO Time_Table (student_id, course_id, time_start, time_end, room, campus)
VALUES
    (2, 1, '2024-05-15 09:00:00', '2024-05-15 11:00:00', 'N16A', 'NDC'),
    (2, 2, '2024-05-16 10:00:00', '2024-05-16 12:00:00', 'L12', 'NDL'),
    (2, 3, '2024-05-17 11:00:00', '2024-05-17 13:00:00', 'Hors ISEP', 'Teams'),

    (3, 1, '2024-05-15 10:00:00', '2024-05-15 12:00:00', 'N16A', 'NDC'),
    (3, 2, '2024-05-16 11:00:00', '2024-05-16 13:00:00', 'L12', 'NDL'),
    (3, 3, '2024-05-17 12:00:00', '2024-05-17 14:00:00', 'Hors ISEP', 'Teams'),

    (10, 1, '2024-05-15 18:00:00', '2024-05-15 20:00:00', 'N16A', 'NDC'),
    (10, 2, '2024-05-16 19:00:00', '2024-05-16 21:00:00', 'L12', 'NDL'),
    (10, 3, '2024-05-17 20:00:00', '2024-05-17 22:00:00', 'Hors ISEP', 'Teams');

INSERT INTO Course_List (professor_id, course_id)
VALUES
    (1, 1),
    (2, 2),
    (2, 3);
