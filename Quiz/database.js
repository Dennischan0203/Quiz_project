import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "quizdb"
});

export async function getQuestions() {
  try {
    const [rows] = await db.query("SELECT * FROM questions ORDER BY RAND() LIMIT 1");
    return rows; // returns an array of objects
  } catch (err) {
    console.error("Error fetching questions:", err);
    return [];
  }
}
