-- DEPRECATED -> SWITCHED TO DOCKER

CREATE TABLE Student (
    student_id INT IDENTITY (1, 1) PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    token varchar(255),
    pfpImgPath varchar(255)
)

CREATE TABLE Administrator (
    admin_id INT IDENTITY (1, 1) PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    token varchar(255),
    pfpImgPath varchar(255)
)

CREATE TABLE Professor (
    professor_id INT IDENTITY (1, 1) PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    token varchar(255),
    pfpImgPath varchar(255)
)

CREATE TABLE Course (
    course_id INT IDENTITY (1, 1) PRIMARY KEY,
    course_name varchar(255) NOT NULL,
)

CREATE TABLE Time_Table (
    time_table_id INT IDENTITY (1, 1) PRIMARY KEY,
    student_id int NOT NULL,
    course_id int NOT NULL,
    time_start datetime NOT NULL,
    time_end datetime NOT NULL,
    room varchar(255) NOT NULL,
    campus varchar(255) NOT NULL,
    absent BIT NOT NULL DEFAULT 0,
    minutes_late int NOT NULL DEFAULT 0,
--     FOREIGN KEY (student_id) REFERENCES Student(student_id),
--     FOREIGN KEY (course_id) REFERENCES Course(course_id)
)

CREATE TABLE Course_List (
    course_list_id INT IDENTITY (1, 1) PRIMARY KEY,
    professor_id int NOT NULL,
    course_id int NOT NULL,
--     FOREIGN KEY (professor_id) REFERENCES Professor(professor_id),
--     FOREIGN KEY (course_id) REFERENCES Course(course_id)
)

CREATE TABLE Promo (
    promo_id INT IDENTITY (1, 1) PRIMARY KEY,
    promo_name varchar(255) NOT NULL,
)

CREATE TABLE Justification (
    justification_id INT IDENTITY (1, 1) PRIMARY KEY,
    accepted BIT NOT NULL DEFAULT 0,
    reason varchar(255) NOT NULL,
    student_id int NOT NULL,
    time_table_id int NOT NULL,
)

CREATE TABLE JustificationImage (
    justification_image_id INT IDENTITY (1, 1) PRIMARY KEY,
    name varchar(255) NOT NULL,
    file_name varchar(255) NOT NULL,
    justification_id int NOT NULL,
)

CREATE TABLE Conversation (
    conversation_id INT IDENTITY (1, 1) PRIMARY KEY,
    student_id int NOT NULL,
    professor_id int NOT NULL,
)

CREATE TABLE Message (
    message_id INT IDENTITY (1, 1) PRIMARY KEY,
    admin_id INT NOT NULL,
    conversation_id int NOT NULL,
    message varchar(255) NOT NULL,
    student_id INT NOT NULL,
    professor_id INT NOT NULL,
    timestamp datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
)