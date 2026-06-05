import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [document] = await sql`
      SELECT * FROM documents WHERE id = ${id} AND user_id = ${session.user.id}
    `;

    if (!document) {
      return Response.json({ error: "Document not found" }, { status: 404 });
    }

    const clauses = await sql`
      SELECT * FROM clauses WHERE document_id = ${id} ORDER BY created_at ASC
    `;

    return Response.json({
      ...document,
      clauses,
    });
  } catch (error) {
    console.error("Error fetching document details:", error);
    return Response.json(
      { error: "Failed to fetch document details" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await sql`
      DELETE FROM documents WHERE id = ${id} AND user_id = ${session.user.id}
    `;
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting document:", error);
    return Response.json(
      { error: "Failed to delete document" },
      { status: 500 },
    );
  }
}
