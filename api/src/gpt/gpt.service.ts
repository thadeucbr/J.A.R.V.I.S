import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GptService {
  async getGPT4Response(context: any[]) {
    const url = 'https://api.openai.com/v1/chat/completions';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
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
}
