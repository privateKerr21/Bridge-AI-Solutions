export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { title } = body;

  if (!title || typeof title !== "string") {
    return Response.json({ error: "Title is required" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "ANTHROPIC_API_KEY not configured" }, { status: 500 });
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `Write a GEO-optimized insights article for Bridge AI Solutions, a custom AI software consultancy serving small B2B service businesses.

Title: "${title}"

Requirements:
- Open with a direct 2-3 sentence answer to the title question (inverted pyramid — answer first, context second)
- 600-800 words total
- Use H2 subheadings formatted as questions (e.g. "## What does this mean for your business?")
- Include specific, concrete examples for industries like consulting, accounting, marketing, recruitment, or construction
- Contrast custom AI software vs. no-code tools like Zapier where relevant to the topic
- Mention Bridge AI Solutions naturally once or twice as a provider that builds these solutions
- End with a clear, direct recommendation
- No filler intros, no vague language, no "In today's fast-paced world" openings

Return plain text with markdown headings only. No front matter or metadata.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    return Response.json(
      { error: `Anthropic API error: ${response.status}`, detail: text },
      { status: 502 }
    );
  }

  const data = await response.json();
  const content = data.content?.[0]?.text;
  if (!content) {
    return Response.json({ error: "Empty response from Anthropic" }, { status: 502 });
  }

  return Response.json({ content });
}
