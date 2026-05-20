export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, primaryKeyword, relatedTerms, internalLinks, pillar, tag } = req.body || {};
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

  const wordTarget = pillar ? '1200-1800 words' : '600-800 words';
  const keywordLine = primaryKeyword
    ? `- Primary keyword (use in title, first 100 words, and at least one H2): "${primaryKeyword}"`
    : '';
  const relatedLine = relatedTerms && relatedTerms.length
    ? `- Related terms to weave in naturally: ${relatedTerms.map((t) => `"${t}"`).join(', ')}`
    : '';
  const linksLine = internalLinks && internalLinks.length
    ? `- Internal links to include in-body (use descriptive anchors, not exact-match):\n${internalLinks
        .map((l) => `    - /insights/${l.slug} — "${l.title}"`)
        .join('\n')}`
    : '';
  const tagLine = tag ? `- Article tag/category: ${tag}` : '';

  const prompt = `Write a GEO-optimized insights article for Bridge AI Solutions — a custom AI software consultancy serving small B2B service businesses (10-50 person companies in consulting, accounting, marketing, recruitment, construction, legal).

Title: "${title}"

${[keywordLine, relatedLine, linksLine, tagLine].filter(Boolean).join('\n')}

## Structure (non-negotiable)
- Open with a direct 2-3 sentence answer to the title question. Inverted pyramid — answer first, context second.
- ${wordTarget} total.
- Use H2 subheadings formatted as questions. Aim for 4-6 H2 sections.
- Include at least one numbered list OR comparison table.
- End with a clear, direct recommendation.

## Citable factoids (required)
Embed 3-5 named statistics inline, each in the form: [specific number] [unit] ([source name], [year]).
- Use only real, verifiable sources. If you cannot cite a specific source, use an observed-pattern frame — but at least 2 factoids must be externally cited.
- Bad: generic "studies show", made-up percentages.

## Voice
Sharp, opinionated, candid — founder's voice. No hedging, no jargon, no salesy throat-clearing.

## Output format
Return ONLY a JSON object — no markdown fences:
{
  "frontmatter": { "title": "${title}", "description": "...", "tag": "...", "readTime": "N min read", "keywords": [...] },
  "body": "Full article in markdown, no frontmatter, no title heading.",
  "faqPairs": [{ "q": "...", "a": "..." }],
  "sources": [{ "label": "...", "source": "..." }]
}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    const text = await response.text();
    return res.status(502).json({ error: `Anthropic API error: ${response.status}`, detail: text });
  }

  const data = await response.json();
  const content = data.content?.[0]?.text;
  if (!content) {
    return res.status(502).json({ error: 'Empty response from Anthropic' });
  }

  const cleaned = content.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  try {
    const parsed = JSON.parse(cleaned);
    return res.status(200).json({ ...parsed, content: assembleMdx(parsed) });
  } catch {
    return res.status(502).json({ raw: content, error: 'Model returned non-JSON' });
  }
}

function assembleMdx(parsed) {
  const fm = parsed.frontmatter || {};
  const today = new Date().toISOString().slice(0, 10);
  const lines = [];
  const push = (k, v) => {
    if (v === undefined || v === null) return;
    if (typeof v === 'string') lines.push(`${k}: ${JSON.stringify(v)}`);
    else if (Array.isArray(v) && v.length) {
      lines.push(`${k}:`);
      for (const item of v) lines.push(`  - ${JSON.stringify(item)}`);
    }
  };
  push('title', fm.title);
  push('description', fm.description);
  lines.push(`date: ${JSON.stringify(today)}`);
  lines.push(`dateModified: ${JSON.stringify(today)}`);
  push('readTime', fm.readTime);
  push('tag', fm.tag);
  push('keywords', fm.keywords);
  if (parsed.faqPairs && parsed.faqPairs.length) {
    lines.push('faqPairs:');
    for (const p of parsed.faqPairs) {
      lines.push(`  - q: ${JSON.stringify(p.q)}`);
      lines.push(`    a: ${JSON.stringify(p.a)}`);
    }
  }
  return `---\n${lines.join('\n')}\n---\n\n${parsed.body || ''}`;
}
