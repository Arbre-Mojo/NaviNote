CREATE TABLE Student (
    student_id INT IDENTITY (1, 1) PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    pfpImgPath varchar(255)
)

CREATE TABLE Administrator (
    admin_id INT IDENTITY (1, 1) PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    pfpImgPath varchar(255)
)

CREATE TABLE Professor (
    professor_id INT IDENTITY (1, 1) PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
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
    is_absent BIT NOT NULL DEFAULT 0,
    minutes_late int NOT NULL DEFAULT 0,
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
)

CREATE TABLE Course_List (
    course_list_id INT IDENTITY (1, 1) PRIMARY KEY,
    professor_id int NOT NULL,
    course_id int NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES Professor(professor_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
)

ALTER TABLE Student add token varchar(255);
ALTER TABLE Administrator add token varchar(255);
ALTER TABLE Professor add token varchar(255);
exec sp_rename 'dbo.administrator', 'Admin'