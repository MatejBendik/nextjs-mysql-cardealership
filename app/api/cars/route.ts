import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET() {
  try {
    const db = await pool.getConnection();
    const query = "SELECT * FROM cars";
    const [rows] = await db.execute(query);
    db.release();

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { brand, model, year } = await request.json();

  console.log("On server: ", brand, model, year);

  try {
    const db = await pool.getConnection();
    const query = "INSERT INTO cars (brand, model, year) VALUES (?, ?, ?)";
    const [rows] = await db.execute(query, [brand, model, year]);
    db.release();

    return NextResponse.json(rows);
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}
