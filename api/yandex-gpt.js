// Vercel Serverless Function - Proxy for YandexGPT API
// This avoids CORS issues by making the request from the server side

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, apiKey, folderId } = req.body;

    if (!apiKey || !folderId) {
      return res.status(400).json({ 
        error: 'Missing API credentials',
        message: 'API Key and Folder ID are required'
      });
    }

    console.log('Proxying request to YandexGPT...');

    const response = await fetch(
      'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Api-Key ${apiKey}`,
          'x-folder-id': folderId,
        },
        body: JSON.stringify({
          modelUri: `gpt://${folderId}/yandexgpt-lite/latest`,
          completionOptions: {
            stream: false,
            temperature: 0.7,
            maxTokens: 1000,
          },
          messages: [
            {
              role: 'system',
              text: prompt.system || 'Вы — помощник для интерактивной истории.',
            },
            {
              role: 'user',
              text: prompt.user,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('YandexGPT API error:', response.status, errorText);
      return res.status(response.status).json({
        error: 'YandexGPT API error',
        details: errorText,
      });
    }

    const data = await response.json();
    console.log('YandexGPT response received');

    return res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}

