import fetch from 'node-fetch';

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

/**
 * Queries DeepSeek API about AI development perspectives
 * @returns Promise with API response about AI development
 * @throws Error if DEEPSEEK_API_KEY is missing or API request fails
 */
async function getAIDevelopmentInsight(): Promise<string> {
  const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DEEPSEEK_API_KEY environment variable is required');
  }

  const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
  
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{
          role: 'user',
          content: 'How do you view the current development of AI?'
        }],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: DeepSeekResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching from DeepSeek API:', error);
    throw error;
  }
}

// Example usage
// getAIDevelopmentInsight().then(console.log).catch(console.error);

export default getAIDevelopmentInsight;