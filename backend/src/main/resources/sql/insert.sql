INSERT INTO Student (first_name, last_name, email, password)
VALUES ('John', 'Doe', 'john.doe@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
       ('Jane', 'Smith', 'jane.smith@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
       ('Michael', 'Johnson', 'michael.johnson@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
       ('Emily', 'Brown', 'emily.brown@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
       ('David', 'Martinez', 'david.martinez@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
       ('Sarah', 'Garcia', 'sarah.garcia@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
       ('Daniel', 'Lopez', 'daniel.lopez@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
       ('Jennifer', 'Rodriguez', 'jennifer.rodriguez@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
       ('James', 'Wilson', 'james.wilson@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
       ('Jessica', 'Lee', 'jessica.lee@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e');

INSERT INTO Administrator (first_name, last_name, email, password)
VALUES
    ('Admin', 'One', 'admin1@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
    ('Admin', 'Two', 'admin2@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
    ('Admin', 'Three', 'admin3@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e');

INSERT INTO Professor (first_name, last_name, email, password)
VALUES
    ('John', 'Smith', 'john.smith@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
    ('Emily', 'Johnson', 'emily.johnson@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e'),
    ('Michael', 'Brown', 'michael.brown@example.com', '$2a$10$BmcMCDQomX1CcxNh891qc.gqJWvi9C72csoM4pOgS2UiqQnYaCP6e');

INSERT INTO Course (course_name)
VALUES
    ('Mathematics'),
    ('English'),
    ('Physics');

INSERT INTO Time_Table (student_id, course_id, time_start, time_end, room, campus)
VALUES
    (1, 1, '2024-05-15 08:00:00', '2024-05-15 10:00:00', 'N16A', 'NDC'),
    (1, 2, '2024-05-16 09:00:00', '2024-05-16 11:00:00', 'L12', 'NDL'),
    (1, 3, '2024-05-17 10:00:00', '2024-05-17 12:00:00', 'Hors ISEP', 'Teams'),

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
