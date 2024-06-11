INSERT INTO Promo(promo_name)
VALUES ('I1'),
       ('I2'),
       ('P1'),
       ('P2'),
       ('A1'),
       ('A2'),
       ('A3');

INSERT INTO Student (first_name, last_name, email, password, promo_id)
VALUES ('John', 'Doe', 'student@student.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e', 1),
       ('Jane', 'Smith', 'jane.smith@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e', 2),
       ('Michael', 'Johnson', 'michael.johnson@example.com',
        '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e', 3),
       ('Emily', 'Brown', 'emily.brown@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e', 4),
       ('David', 'Martinez', 'david.martinez@example.com',
        '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e', 5),
       ('Sarah', 'Garcia', 'sarah.garcia@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e',
        1),
       ('Daniel', 'Lopez', 'daniel.lopez@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e',
        2),
       ('Jennifer', 'Rodriguez', 'jennifer.rodriguez@example.com',
        '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e', 3),
       ('James', 'Wilson', 'james.wilson@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e',
        4),
       ('Jessica', 'Lee', 'jessica.lee@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e', 5);

INSERT INTO Admin (first_name, last_name, email, password)
VALUES ('Admin', 'One', 'admin@admin.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
       ('Admin', 'Two', 'admin2@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
       ('Admin', 'Three', 'admin3@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e');

INSERT INTO Professor (first_name, last_name, email, password)
VALUES ('John', 'Smith', 'mathprof@prof.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
       ('Emily', 'Johnson', 'engprof@prof.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
       ('Michael', 'Brown', 'physprof@prof.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e');

INSERT INTO Course (course_name)
VALUES ('Mathematics'),
       ('English'),
       ('Physics');

INSERT INTO Time_Table (course_id, time_start, time_end, room, campus)
VALUES (1, '2024-05-15 07:00:00', '2024-05-15 08:00:00', 'N16A', 'NDC'),
       (2, '2024-05-15 08:00:00', '2024-05-15 09:00:00', 'N16A', 'NDC'),
       (3, '2024-05-15 07:00:00', '2024-05-15 08:00:00', 'N16A', 'NDC'),
       (3, '2024-05-15 10:00:00', '2024-05-15 11:00:00', 'N16A', 'NDC'),

       (1, '2024-05-15 07:00:00', '2024-05-15 09:00:00', 'N16A', 'NDC'),
       (2, '2024-05-15 08:00:00', '2024-05-15 10:00:00', 'N16A', 'NDC'),
       (3, '2024-05-16 09:00:00', '2024-05-16 11:00:00', 'L12', 'NDL'),

       (1, '2024-05-15 09:00:00', '2024-05-15 11:00:00', 'N16A', 'NDC'),
       (2, '2024-05-16 10:00:00', '2024-05-16 12:00:00', 'L12', 'NDL'),
       (3, '2024-05-17 11:00:00', '2024-05-17 13:00:00', 'Hors ISEP', 'Teams'),

       (1, '2024-05-15 10:00:00', '2024-05-15 12:00:00', 'N16A', 'NDC'),
       (2, '2024-05-16 11:00:00', '2024-05-16 13:00:00', 'L12', 'NDL'),
       (3, '2024-05-17 12:00:00', '2024-05-17 14:00:00', 'Hors ISEP', 'Teams'),

       (1, '2024-05-15 18:00:00', '2024-05-15 20:00:00', 'N16A', 'NDC'),
       (2, '2024-05-16 19:00:00', '2024-05-16 21:00:00', 'L12', 'NDL');

INSERT INTO Time_Table (course_id, time_start, time_end, room, campus)
VALUES (2, '2024-06-10 08:00:00', '2024-06-10 09:00:00', 'N16A', 'NDC'),
       (3, '2024-06-10 09:00:00', '2024-06-10 10:00:00', 'N16A', 'NDC'),
       (1, '2024-06-10 10:00:00', '2024-06-10 11:00:00', 'N16A', 'NDC'),
       (2, '2024-06-10 11:00:00', '2024-06-10 12:00:00', 'N16A', 'NDC'),
       (3, '2024-06-10 12:00:00', '2024-06-10 13:00:00', 'N16A', 'NDC'),

       (1, '2024-06-11 07:00:00', '2024-06-11 08:00:00', 'N16A', 'NDC'),
       (3, '2024-06-11 09:00:00', '2024-06-11 10:00:00', 'N16A', 'NDC'),
       (1, '2024-06-11 10:00:00', '2024-06-11 11:00:00', 'N16A', 'NDC'),
       (2, '2024-06-11 11:00:00', '2024-06-11 12:00:00', 'N16A', 'NDC'),
       (3, '2024-06-11 12:00:00', '2024-06-11 13:00:00', 'N16A', 'NDC'),

       (1, '2024-06-12 07:00:00', '2024-06-12 08:00:00', 'N16A', 'NDC'),
       (2, '2024-06-12 08:00:00', '2024-06-12 09:00:00', 'N16A', 'NDC'),
       (1, '2024-06-12 10:00:00', '2024-06-12 11:00:00', 'N16A', 'NDC'),
       (2, '2024-06-12 11:00:00', '2024-06-12 12:00:00', 'N16A', 'NDC'),
       (3, '2024-06-12 12:00:00', '2024-06-12 13:00:00', 'N16A', 'NDC'),

       (1, '2024-06-13 07:00:00', '2024-06-13 08:00:00', 'N16A', 'NDC'),
       (2, '2024-06-13 08:00:00', '2024-06-13 09:00:00', 'N16A', 'NDC'),
       (3, '2024-06-13 09:00:00', '2024-06-13 10:00:00', 'N16A', 'NDC'),
       (2, '2024-06-13 11:00:00', '2024-06-13 12:00:00', 'N16A', 'NDC'),
       (3, '2024-06-13 12:00:00', '2024-06-13 13:00:00', 'N16A', 'NDC'),

       (1, '2024-06-14 07:00:00', '2024-06-14 08:00:00', 'N16A', 'NDC'),
       (2, '2024-06-14 08:00:00', '2024-06-14 09:00:00', 'N16A', 'NDC'),
       (3, '2024-06-14 09:00:00', '2024-06-14 10:00:00', 'N16A', 'NDC'),
       (1, '2024-06-14 10:00:00', '2024-06-14 11:00:00', 'N16A', 'NDC'),
       (3, '2024-06-14 12:00:00', '2024-06-14 13:00:00', 'N16A', 'NDC');

-- INSERT INTO Time_Table (student_id, course_id, time_start, time_end, room, campus)
-- VALUES
--     (10, 3, '2024-05-17 20:15:00', '2024-05-17 22:10:00', 'Hors ISEP', 'Teams'),
--     (10, 3, '2024-05-17 20:20:00', '2024-05-17 21:35:00', 'Hors ISEP', 'Teams'),
--     (10, 3, '2024-05-17 20:25:00', '2024-05-17 22:25:00', 'Hors ISEP', 'Teams'),
--     (10, 2, '2024-05-17 20:30:00', '2024-05-17 22:00:00', 'Hors ISEP', 'Teams');

INSERT INTO Student_List(absent, minutes_late, student_id, time_table_id)
VALUES (true, 0, 1, 1),
       (true, 0, 1, 3),
       (false, 10, 1, 4),
       (false, 20, 1, 5),
       (false, 20, 1, 6),
       (false, 0, 1, 7),
       (false, 0, 1, 8),
       (false, 0, 1, 9),
       (false, 0, 1, 10),
       (false, 0, 1, 11),
       (false, 0, 1, 12),
       (false, 0, 1, 13),
       (false, 0, 1, 14),
       (false, 0, 1, 15),
       (true, 0, 1, 16),
       (true, 0, 1, 17),
       (false, 10, 1, 18),
       (false, 20, 1, 19),
       (false, 20, 1, 20),
       (false, 0, 1, 21),
       (false, 0, 1, 22),
       (false, 0, 1, 23),
       (false, 0, 1, 24),
       (false, 0, 1, 25),
       (false, 0, 1, 26),
       (false, 0, 1, 27),
       (false, 0, 1, 28),
       (false, 0, 1, 29),
       (true, 0, 1, 30),
       (true, 0, 1, 31),
       (false, 10, 1, 32),
       (false, 20, 1, 33),
       (false, 20, 1, 34),
       (false, 0, 1, 35),
       (false, 0, 1, 36),
       (false, 0, 1, 37),
       (false, 0, 1, 38),
       (false, 0, 1, 39),
       (false, 0, 1, 40);

INSERT INTO Student_List(absent, minutes_late, student_id, time_table_id)
VALUES (true, 0, 1, 2),
       (true, 0, 2, 2),
       (true, 0, 3, 2),
       (false, 10, 4, 2),
       (false, 20, 5, 2),
       (false, 20, 6, 2),
       (false, 0, 7, 2),
       (false, 0, 8, 2),
       (false, 0, 9, 2),
       (false, 0, 10, 2);

INSERT INTO Course_List (professor_id, course_id)
VALUES (1, 1),
       (2, 2),
       (3, 3);
