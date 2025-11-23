-- Create database
CREATE DATABASE IF NOT EXISTS quizdb;
USE quizdb;

-- Create table for quiz questions
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    optionA VARCHAR(255) NOT NULL,
    optionB VARCHAR(255) NOT NULL,
    optionC VARCHAR(255) NOT NULL,
    optionD VARCHAR(255) NOT NULL,
    correctOption CHAR(1) NOT NULL
);

INSERT INTO questions (question, optionA, optionB, optionC, optionD, correctOption)
VALUES
("What is 2 + 2?", "3", "4", "5", "6", "B"),
("Which planet is closest to the sun?", "Earth", "Venus", "Mercury", "Mars", "C"),
("What is 10 + 12?", "3", "4", "22", "6", "C"),
("What is 25 + 52?", "3", "4", "5", "77", "D"),
("Which of the following is a programming language?", "C++", "Piefun", "Razor", "Mars", "A"),
("What is 22 + 22?", "3", "44", "5", "6", "B");