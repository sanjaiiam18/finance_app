// src/app/api/loans/route.js
import mysql from "mysql2/promise";

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await connection.execute("SELECT * FROM loandetails");

    await connection.end();

    return Response.json(rows);
  } catch (error) {
    console.error("Database query error:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
