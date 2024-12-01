import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { aadhaarNumber, Repaid } = body;

    // Establish database connection using a connection pool
    const connection = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Corrected SQL query
    const query = `UPDATE LoanDetails
                   SET Repaid = ?
                   WHERE AadhaarNumber = ?;`;

    // Map undefined values to null
    const value = [Repaid, aadhaarNumber].map((val) =>
      val === undefined ? null : val
    );

    // Execute the query
    const [result] = await connection.execute(query, value);

    // Close the connection
    await connection.end();

    // Send the success response
    return new Response(
      JSON.stringify({
        message: "Data updated successfully",
        result,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating data:", error);

    // Send error response
    return NextResponse.json(
      {
        message: "An error occurred while updating data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
