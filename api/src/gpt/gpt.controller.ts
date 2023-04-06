import { Controller, Post, Body } from '@nestjs/common';
import { GptService } from './gpt.service';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('conversation')
  async generalGPTConversation(@Body('userInput') userInput: string) {
    const generalGPTContext = [
      {
        role: 'system',
        content:
          'Você é um assistente virtual inteligente pronto para responder a perguntas sobre qualquer coisa que o usuário desejar conversar.',
      },
    ];

    generalGPTContext.push({ role: 'user', content: userInput });
    const gptResponse = await this.gptService.getGPT4Response(
      generalGPTContext,
    );
    generalGPTContext.push({ role: 'assistant', content: gptResponse });
    return { response: gptResponse };
  }
}
