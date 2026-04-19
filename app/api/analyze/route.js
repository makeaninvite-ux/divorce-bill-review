export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { fileName, fileType, fileData } = body || {};

    if (!fileType || !fileData) {
      return Response.json(
        { error: "Missing file data." },
        { status: 400 }
      );
    }

    const allowed = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    if (!allowed.includes(fileType)) {
      return Response.json(
        { error: "Unsupported file type." },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Server is missing ANTHROPIC_API_KEY." },
        { status: 500 }
      );
    }

    const isPdf = fileType === "application/pdf";

    const analysisPrompt = `
You are reviewing a divorce attorney invoice for entries worth questioning.

Be conservative.
Do not accuse anyone of wrongdoing.
Frame concerns as questions the client could ask.

Look for:
- vague descriptions
- block billing
- clerical or administrative work billed at attorney rates
- billing-related internal tasks
- unexplained fees
- duplicative conferencing
- math inconsistencies
- anything else worth calmly questioning

Return plain English only.
Use short sections:
1. Summary
2. Entries to question
3. Suggested follow-up questions
`;

    const content = [
      isPdf
        ? {
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: fileData,
            },
          }
        : {
            type: "image",
            source: {
              type: "base64",
              media_type: fileType,
              data: fileData,
            },
          },
      {
        type: "text",
        text: `${analysisPrompt}\n\nFile name: ${fileName || "invoice"}`,
      },
    ];

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1800,
        temperature: 0,
        messages: [
          {
            role: "user",
            content,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data?.error?.message || "Anthropic request failed." },
        { status: response.status }
      );
    }

    const text =
      (data.content || [])
        .filter((item) => item.type === "text")
        .map((item) => item.text)
        .join("\n\n") || "No analysis returned.";

    return Response.json({ text });
  } catch (err) {
    return Response.json(
      { error: err.message || "Unexpected server error." },
      { status: 500 }
    );
  }
}
