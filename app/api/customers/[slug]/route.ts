import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug; // car id or brand

  try {
    const db = await pool.getConnection();
    let query = "";

    // if slug is a number, then it's a car id
    if (!isNaN(parseInt(slug))) {
      query = "SELECT * FROM Cestujuci WHERE CestujuciID = ?";
    } else {
      query = "SELECT * FROM cars WHERE brand = ?";
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
  const slug = params.slug; // car id

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
  const slug = params.slug; // car id
  const { brand, model, year } = await request.json();

  try {
    const db = await pool.getConnection();
    const query = "UPDATE cars SET brand = ?, model = ?, year = ? WHERE id = ?";
    const [rows] = await db.execute(query, [brand, model, year, slug]);
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
