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
("Which of the following is the capital of France?", "Toyko", "Paris", "Kenya", "Hong Kong", "B"),
("Which planet is closest to the sun?", "Earth", "Venus", "Mercury", "Mars", "C"),
("Which of the following is the capital of Japan?", "Toyko", "Paris", "Kenya", "Hong Kong", "A"),
("What is 25 + 52?", "36", "45", "52", "77", "D"),
("Which of the following is a programming language?", "C++", "Piefun", "Razor", "React", "A"),
("Which of the following is a programming language?", "Java", "Laravel", "Express", "React", "A"),
("What is 22 + 22/2?", "44", "33", "22", "55", "B");