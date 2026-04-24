export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { text } = req.body || {};
  if (!text || typeof text !== 'string') return res.status(400).json({ error: 'text is required' });

  const apiKey = process.env.GPTZERO_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GPTZERO_API_KEY not configured' });

  const response = await fetch('https://api.gptzero.me/v2/predict/text', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ document: text })
  });

  if (!response.ok) {
    const detail = await response.text();
    return res.status(502).json({ error: `GPTZero error: ${response.status}`, detail });
  }

  const data = await response.json();
  const doc = data.documents?.[0];
  if (!doc) return res.status(502).json({ error: 'Empty response from GPTZero' });

  return res.status(200).json({
    score: Math.round((doc.average_generated_prob || 0) * 100),
    predicted_class: doc.predicted_class
  });
}
