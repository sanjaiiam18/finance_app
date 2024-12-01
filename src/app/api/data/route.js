import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const {
      aadhaarNumber,
      name,
      address,
      productAmount,
      downPayment,
      loanPayment,
      interestRate,
      loanInterestAmount,
      totalAmount,
      emiAmount,
      dueDate,
      months,
      mobileNumber,
      alternateMobileNumber,
      fatherName,
      benamiName,
      benamiAadhaarNumber,
      placeVia,
      taluk,
      district,
      pincode,
    } = body;

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

    // Prepare the SQL query
    const query = `
      INSERT INTO loandetails(
        aadhaarNumber, name, address, productAmount, downPayment, loanPayment, 
        interestRate, loanInterestAmount, totalAmount, emiAmount, dueDate, 
        months, mobileNumber, alternateMobileNumber, fatherName, benamiName, 
        benamiAadhaarNumber, placeVia, taluk, district, pincode
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Prepare values and replace undefined with null
    const values = [
      aadhaarNumber,
      name,
      address,
      productAmount,
      downPayment,
      loanPayment,
      interestRate,
      loanInterestAmount,
      totalAmount,
      emiAmount,
      dueDate,
      months,
      mobileNumber,
      alternateMobileNumber,
      fatherName,
      benamiName,
      benamiAadhaarNumber,
      placeVia,
      taluk,
      district,
      pincode,
    ].map((value) => (value === undefined ? null : value));

    // Execute the query
    const [result] = await connection.execute(query, values);

    // Close the connection
    await connection.end();

    // Send the success response
    return new Response(
      {
        message: "Data inserted successfully",
        result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error inserting data:", error);

    // Send error response
    return NextResponse.json(
      {
        message: "An error occurred while inserting data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
