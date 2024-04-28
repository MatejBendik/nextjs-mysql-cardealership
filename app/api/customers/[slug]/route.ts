import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug; // id or name

  try {
    const db = await pool.getConnection();
    let query = "";

    // if slug is a number, then it's a id
    if (!isNaN(parseInt(slug))) {
      query = "SELECT * FROM Cestujuci WHERE CestujuciID = ?";
    } else {
      query = "SELECT * FROM Cestujuci WHERE Meno = ?";
    }

    const [rows] = await db.execute(query, [slug]);

    console.log("rows: ", rows);

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug; // id

  console.log("slug: ", slug);

  try {
    const db = await pool.getConnection();
    const query = "DELETE FROM Cestujuci WHERE CestujuciID = ?";
    const [rows] = await db.execute(query, [slug]);
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug; // id
  const { ZamestnanecID, Meno, Priezvisko, Kontakt, Platba } =
    await request.json();

  console.log({ ZamestnanecID, Meno, Priezvisko, Kontakt, Platba }, "reeeeeee");

  try {
    const db = await pool.getConnection();
    const query =
      "UPDATE Cestujuci SET ZamestnanecID = ?, Meno = ?, Priezvisko = ?, Kontakt = ?, Platba = ? WHERE CestujuciID = ?;";
    const [rows] = await db.execute(query, [
      ZamestnanecID,
      Meno,
      Priezvisko,
      Kontakt,
      Platba,
      slug,
    ]);
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
