import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const keys = await sql`
      SELECT id, name, api_key, allowed_origin, created_at, is_active
      FROM embed_keys
      WHERE user_id = ${session.user.id}
      ORDER BY created_at DESC
    `;

    return Response.json(keys);
  } catch (error) {
    console.error("Error fetching embed keys:", error);
    return Response.json(
      { error: "Failed to fetch embed keys" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, allowed_origin } = await request.json();

    if (!name) {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    const [key] = await sql`
      INSERT INTO embed_keys (user_id, name, allowed_origin)
      VALUES (${session.user.id}, ${name}, ${allowed_origin || null})
      RETURNING id, name, api_key, allowed_origin, created_at, is_active
    `;

    return Response.json(key, { status: 201 });
  } catch (error) {
    console.error("Error creating embed key:", error);
    return Response.json(
      { error: "Failed to create embed key" },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    if (!id) {
      return Response.json({ error: "ID is required" }, { status: 400 });
    }

    await sql`DELETE FROM embed_keys WHERE id = ${id} AND user_id = ${session.user.id}`;
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting embed key:", error);
    return Response.json(
      { error: "Failed to delete embed key" },
      { status: 500 },
    );
  }
}
