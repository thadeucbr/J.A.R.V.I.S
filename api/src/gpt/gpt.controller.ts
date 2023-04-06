import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { GptService } from './gpt.service';
import {
  GPTConversationResponseDto,
  GPTIntetionsResponseDto,
  GeneralGPTConversationDto,
} from './dtos';
import { IntentionsService } from './intentions.service';

@ApiTags('gpt')
@Controller('gpt')
export class GptController {
  constructor(
    private readonly gptService: GptService,
    private intentionsService: IntentionsService,
  ) {}

  @ApiOperation({ summary: 'GPT-4 completion' })
  @ApiBody({
    type: GeneralGPTConversationDto,
    description: 'User input for general GPT conversation',
  })
  @ApiOkResponse({
    type: GPTConversationResponseDto,
    description: 'Generated GPT-4 response',
  })
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
  @ApiOperation({ summary: 'Detect intentions' })
  @ApiBody({
    type: GeneralGPTConversationDto,
    description: 'Used to detect user intentions',
  })
  @ApiOkResponse({
    type: GPTIntetionsResponseDto,
    description: 'Generated GPT-4 response',
  })
  @Post('intentions')
  async detectIntent(@Body('userInput') userInput: string) {
    return await this.intentionsService.detectIntent(userInput);
  }
}
