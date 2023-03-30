const axios = window.axios;

import { API_KEY } from '../apikey.js';

async function getGPT4Response(context) {
  const url = 'https://api.openai.com/v1/chat/completions';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  };

  const data = {
    model: 'gpt-3.5-turbo',
    messages: context,
    max_tokens: 200,
    n: 1,
    stop: null,
    temperature: 0.7,
  };

  try {
    const response = await axios.post(url, data, { headers: headers });
    const completion = response.data.choices[0].message.content.trim();
    return completion;
  } catch (error) {
    console.error('Error fetching GPT-4 response:', error);
    return null;
  }
}

export default getGPT4Response;
