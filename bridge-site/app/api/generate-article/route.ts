interface GenerateBody {
  title: string;
  primaryKeyword?: string;
  relatedTerms?: string[];
  internalLinks?: { slug: string; title: string }[];
  pillar?: boolean;
  tag?: string;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Partial<GenerateBody>;
  const { title, primaryKeyword, relatedTerms, internalLinks, pillar, tag } = body;

  if (!title || typeof title !== "string") {
    return Response.json({ error: "Title is required" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "ANTHROPIC_API_KEY not configured" }, { status: 500 });
  }

  const wordTarget = pillar ? "1200-1800 words" : "600-800 words";
  const keywordLine = primaryKeyword
    ? `- Primary keyword (use in title, first 100 words, and at least one H2): "${primaryKeyword}"`
    : "";
  const relatedLine = relatedTerms?.length
    ? `- Related terms to weave in naturally: ${relatedTerms.map((t) => `"${t}"`).join(", ")}`
    : "";
  const linksLine = internalLinks?.length
    ? `- Internal links to include in-body (use descriptive anchors, not exact-match):\n${internalLinks
        .map((l) => `    - /insights/${l.slug} — "${l.title}"`)
        .join("\n")}`
    : "";
  const tagLine = tag ? `- Article tag/category: ${tag}` : "";

  const prompt = `Write a GEO-optimized insights article for Bridge AI Solutions — a custom AI software consultancy serving small B2B service businesses (10-50 person companies in consulting, accounting, marketing, recruitment, construction, legal).

Title: "${title}"

${[keywordLine, relatedLine, linksLine, tagLine].filter(Boolean).join("\n")}

## Structure (non-negotiable)
- Open with a direct 2-3 sentence answer to the title question. Inverted pyramid — answer first, context second.
- ${wordTarget} total.
- Use H2 subheadings formatted as questions (e.g. "## What does this mean for your business?"). Aim for 4-6 H2 sections.
- Include at least one numbered list OR comparison table (whichever fits the topic better) — listicle/table content gets the highest AI citation rate.
- End with a clear, direct recommendation.

## Citable factoids (this is the GEO core — required)
Embed 3-5 named statistics inline, each in the form: [specific number] [unit] ([source name], [year]).
- Use only real, verifiable sources Hayden could defend in conversation. If you cannot cite a specific source, use an observed-pattern frame instead: "In the 10-50 person agencies we work with, the pattern that keeps surfacing is..." — but at least 2 of the 3-5 factoids must be externally cited.
- Examples of good sources: industry benchmarks (Gartner, McKinsey, HubSpot State of Marketing, Salesforce State of Sales), platform data (LinkedIn, GA4), academic studies, government data, named operator communities (r/agency, Indie Hackers).
- Bad: generic "studies show", "experts say", made-up percentages.

## Voice
- Sharp, opinionated, candid — founder's voice. No hedging, no jargon, no salesy throat-clearing.
- Editorial bite, not pitch-deck cadence.
- First-hand framing where natural: "the pattern we keep seeing", "what operators are telling us".
- Mention Bridge AI Solutions naturally once or twice as the company building these solutions — not as a CTA shoehorn.
- Contrast custom AI software vs. no-code tools (Zapier, Make, n8n) where relevant.

## Output format
Return ONLY a JSON object — no markdown fences, no preamble. Shape:
{
  "frontmatter": {
    "title": "${title}",
    "description": "1-2 sentence meta description, 140-160 chars, includes primary keyword",
    "tag": "Strategy | Framework | Perspective | How-To",
    "readTime": "N min read",
    "keywords": ["primary keyword", "3-5 related terms"]
  },
  "body": "Full article body in markdown. Start with the direct answer paragraph. Then H2 sections. No frontmatter, no title (title is rendered separately).",
  "faqPairs": [
    { "q": "Question phrased exactly as someone would search/ask it", "a": "1-3 sentence direct answer, includes primary keyword naturally" }
  ],
  "sources": [
    { "label": "What was cited", "source": "Source name and year" }
  ]
}

faqPairs: 3-5 pairs. Each question should mirror an H2 from the body. Answers should be self-contained — readable without the article around them.
sources: list every external citation used in the body, for editorial review.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
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

  const cleaned = content.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  try {
    const parsed = JSON.parse(cleaned);
    const mdx = assembleMdx(parsed);
    return Response.json({ ...parsed, content: mdx });
  } catch {
    return Response.json({ raw: content, error: "Model returned non-JSON" }, { status: 502 });
  }
}

function assembleMdx(parsed: {
  frontmatter?: Record<string, unknown>;
  body?: string;
  faqPairs?: { q: string; a: string }[];
}): string {
  const fm = parsed.frontmatter ?? {};
  const today = new Date().toISOString().slice(0, 10);
  const yamlLines: string[] = [];
  const push = (k: string, v: unknown) => {
    if (v === undefined || v === null) return;
    if (typeof v === "string") yamlLines.push(`${k}: ${JSON.stringify(v)}`);
    else if (Array.isArray(v)) {
      if (!v.length) return;
      yamlLines.push(`${k}:`);
      for (const item of v) yamlLines.push(`  - ${JSON.stringify(item)}`);
    }
  };
  push("title", fm.title);
  push("description", fm.description);
  yamlLines.push(`date: ${JSON.stringify(today)}`);
  yamlLines.push(`dateModified: ${JSON.stringify(today)}`);
  push("readTime", fm.readTime);
  push("tag", fm.tag);
  push("keywords", fm.keywords);
  if (parsed.faqPairs?.length) {
    yamlLines.push("faqPairs:");
    for (const p of parsed.faqPairs) {
      yamlLines.push(`  - q: ${JSON.stringify(p.q)}`);
      yamlLines.push(`    a: ${JSON.stringify(p.a)}`);
    }
  }
  return `---\n${yamlLines.join("\n")}\n---\n\n${parsed.body ?? ""}`;
}
