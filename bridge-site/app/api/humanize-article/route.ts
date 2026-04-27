export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { title, content } = body;

  if (!content || typeof content !== "string") {
    return Response.json({ error: "content is required" }, { status: 400 });
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
          content: `You're editing an article for Bridge AI Solutions. It scored high on AI detection tools like GPTZero. Rewrite it to sound like it came from a real human consultant with genuine opinions.

RULES — apply every one of these:
- Vary sentence length aggressively. Some sentences: one or two words. Others can run a little longer with natural connectors.
- Use contractions everywhere: don't, it's, you're, they've, that's, we've
- Open 2–3 paragraphs with "And", "But", or "So" (not "In", "The", "This")
- Add one or two brief first-person observations, e.g. "I've watched this trip up otherwise sharp teams", "In practice, this is the step that gets skipped"
- Include one concrete, specific detail or approximate number that grounds the piece
- Cut every corporate filler phrase: "It is important to note", "It is worth mentioning", "In order to", "In today's world"
- Keep the H2 headings but rewrite at least two to sound more conversational
- Do not add new sections, change factual claims, or mention AI or this process
- Stay within 10% of the original word count
- End the article with a short, direct statement — not a soft call to action or a question

Title: "${title || "Article"}"

${content}

Return only the rewritten article in plain markdown. No preamble.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    return Response.json(
      { error: `Anthropic error: ${response.status}`, detail },
      { status: 502 }
    );
  }

  const data = await response.json();
  const humanized = data.content?.[0]?.text;
  if (!humanized) {
    return Response.json({ error: "Empty response from Anthropic" }, { status: 502 });
  }

  return Response.json({ content: humanized });
}
