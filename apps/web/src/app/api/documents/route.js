import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const documents = await sql`
      SELECT id, title, created_at, 
      (SELECT COUNT(*) FROM clauses WHERE document_id = documents.id) as clause_count
      FROM documents 
      WHERE user_id = ${session.user.id}
      ORDER BY created_at DESC
    `;
    return Response.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return Response.json(
      { error: "Failed to fetch documents" },
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

    const { title, text } = await request.json();

    if (!title || !text) {
      return Response.json(
        { error: "Title and text are required" },
        { status: 400 },
      );
    }

    // 1. Save document
    const [doc] = await sql`
      INSERT INTO documents (user_id, title, original_text)
      VALUES (${session.user.id}, ${title}, ${text})
      RETURNING id
    `;

    // 2. Call AI for analysis
    const systemPrompt =
      "You are a Senior Legal Analyst specializing in contract simplification. Your goal is to translate dense, jargon-heavy legal documents into clear, actionable 'Plain English' for a layperson.\n\n" +
      "1. Summarize with Context: For every section, explain 'What this means for the user' in 2 sentences or less.\n" +
      "2. Identify Red Flags: Flag clauses that are unusually restrictive, one-sided, or involve hidden costs. Use a 'Risk Level' (Green for Low, Yellow for Medium, Red for High).\n" +
      "3. Define Jargon: If a specific legal term (e.g., Force Majeure, Severability, Indemnification) is used, provide a simple one-sentence definition.\n" +
      "4. Tone: Professional, objective, and empowering. Avoid 'legalese' in your explanation.\n\n" +
      "Constraint: Always include a disclaimer that this is an AI-generated summary and not professional legal advice.";

    const apiUrl =
      process.env.NEXT_PUBLIC_CREATE_APP_URL +
      "/integrations/google-gemini-2-5-pro/";

    const aiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: "Please analyze this contract: \n\n" + text,
          },
        ],
        json_schema: {
          name: "contract_analysis",
          schema: {
            type: "object",
            properties: {
              clauses: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    original_phrase: { type: "string" },
                    plain_english: { type: "string" },
                    gotcha: { type: "string" },
                    risk_level: {
                      type: "string",
                      enum: ["Green", "Yellow", "Red"],
                    },
                    jargon: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          term: { type: "string" },
                          definition: { type: "string" },
                        },
                        required: ["term", "definition"],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: [
                    "original_phrase",
                    "plain_english",
                    "gotcha",
                    "risk_level",
                    "jargon",
                  ],
                  additionalProperties: false,
                },
              },
            },
            required: ["clauses"],
            additionalProperties: false,
          },
        },
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI Analysis failed:", errorText);
      throw new Error("AI Analysis failed");
    }

    const aiData = await aiResponse.json();
    const result = JSON.parse(aiData.choices[0].message.content);

    // 3. Save clauses
    if (result.clauses && result.clauses.length > 0) {
      for (const clause of result.clauses) {
        await sql`
          INSERT INTO clauses (document_id, original_phrase, plain_english, gotcha, risk_level, jargon)
          VALUES (${doc.id}, ${clause.original_phrase}, ${clause.plain_english}, ${clause.gotcha}, ${clause.risk_level}, ${JSON.stringify(clause.jargon)})
        `;
      }
    }

    return Response.json(doc);
  } catch (error) {
    console.error("Error processing document:", error);
    return Response.json(
      { error: error.message || "Failed to process document" },
      { status: 500 },
    );
  }
}
