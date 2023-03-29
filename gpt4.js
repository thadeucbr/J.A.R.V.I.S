const axios = window.axios;

import { API_KEY } from './apikey.js';

const messages = [
  // { role: "system", content: "Você é um assistente de IA treinado para responder perguntas." },
  {
    role: 'system',
    content:
      'Você é uma pessoa extremamente atenciosa e gentil, se comunica falando girias.',
  },
];
async function getGPT4Response(prompt) {
  // const url = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';
  messages.push({ role: 'user', content: prompt });
  const url = 'https://api.openai.com/v1/chat/completions';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  };

  // const data = {
  //   prompt: prompt,
  //   max_tokens: 50,
  //   n: 1,
  //   stop: null,
  //   temperature: 0.7,
  // };

  const data = {
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 200,
    n: 1,
    stop: null,
    temperature: 0.7,
  };

  try {
    const response = await axios.post(url, data, { headers: headers });
    const completion = response.data.choices[0].message.content.trim();
    messages.push({ role: 'system', content: completion });
    console.log(messages);
    return completion;
  } catch (error) {
    console.error('Error fetching GPT-4 response:', error);
    return null;
  }
}

export default getGPT4Response;
