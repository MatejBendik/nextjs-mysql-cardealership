import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET() {
  try {
    const db = await pool.getConnection();
    const query = "SELECT * FROM Cestujuci LIMIT 500";
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
  const { ZamestnanecID, meno, priezvisko, kontakt, platba } =
    await request.json();

  console.log({ ZamestnanecID, meno, priezvisko, kontakt, platba }, "request");

  try {
    const db = await pool.getConnection();
    const query =
      "INSERT INTO Cestujuci (ZamestnanecID, Meno, Priezvisko, Kontakt, Platba) VALUES (?, ?, ?, ?, ?)";
    const [rows] = await db.execute(query, [
      ZamestnanecID,
      meno,
      priezvisko,
      kontakt,
      platba,
    ]);
    console.log("rows: ", rows);
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
