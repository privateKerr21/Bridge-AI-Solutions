/**
 * Vercel Serverless Function - Chipp.ai Chat Proxy
 * Handles CORS and proxies chat requests to Chipp.ai API
 */

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            res.status(400).json({ error: 'Messages array is required' });
            return;
        }

        // Call Chipp.ai API
        const response = await fetch('https://app.chipp.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer live_ffbdb9fb54f6ebbd1f324528e5f00df4c0e0e8c53c14c4cd3ba16fce4ddb65f7'
            },
            body: JSON.stringify({
                model: 'hopeai4helpinbuild-10038341',
                messages: messages,
                stream: false
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Chipp API error:', response.status, errorText);
            res.status(response.status).json({
                error: `Chipp API error: ${response.status} ${response.statusText}`,
                details: errorText
            });
            return;
        }

        const data = await response.json();
        res.status(200).json(data);

    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}
