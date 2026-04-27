export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { text } = body;

  if (!text || typeof text !== "string") {
    return Response.json({ error: "text is required" }, { status: 400 });
  }

  const apiKey = process.env.GPTZERO_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "GPTZERO_API_KEY not configured" }, { status: 500 });
  }

  const response = await fetch("https://api.gptzero.me/v2/predict/text", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ document: text }),
  });

  if (!response.ok) {
    const detail = await response.text();
    return Response.json(
      { error: `GPTZero error: ${response.status}`, detail },
      { status: 502 }
    );
  }

  const data = await response.json();
  const doc = data.documents?.[0];
  if (!doc) {
    return Response.json({ error: "Empty response from GPTZero" }, { status: 502 });
  }

  return Response.json({
    score: Math.round((doc.average_generated_prob || 0) * 100),
    predicted_class: doc.predicted_class,
  });
}
