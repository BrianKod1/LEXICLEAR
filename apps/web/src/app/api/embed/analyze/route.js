import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    // Validate embed API key
    const embedKey = request.headers.get("x-embed-key");

    if (!embedKey) {
      return Response.json({ error: "Missing embed API key" }, { status: 401 });
    }

    const [keyRecord] = await sql`
      SELECT id, name, allowed_origin, is_active
      FROM embed_keys
      WHERE api_key = ${embedKey}
    `;

    if (!keyRecord) {
      return Response.json({ error: "Invalid embed API key" }, { status: 401 });
    }

    if (!keyRecord.is_active) {
      return Response.json({ error: "Embed key is inactive" }, { status: 403 });
    }

    // Check allowed origin if set
    const origin = request.headers.get("origin");
    if (keyRecord.allowed_origin && origin) {
      const allowed = keyRecord.allowed_origin.replace(/\/$/, "");
      const incoming = origin.replace(/\/$/, "");
      if (allowed !== incoming) {
        return Response.json({ error: "Origin not allowed" }, { status: 403 });
      }
    }

    const { title, text } = await request.json();

    if (!text) {
      return Response.json({ error: "Text is required" }, { status: 400 });
    }

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: "Please analyze this legal text: \n\n" + text,
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
      throw new Error("AI analysis failed");
    }

    const aiData = await aiResponse.json();
    const result = JSON.parse(aiData.choices[0].message.content);

    // CORS headers for embed origins
    const headers = {
      "Access-Control-Allow-Origin": keyRecord.allowed_origin || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-embed-key",
    };

    return new Response(JSON.stringify({ clauses: result.clauses }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...headers },
    });
  } catch (error) {
    console.error("Embed analyze error:", error);
    return Response.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 },
    );
  }
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-embed-key",
    },
  });
}
