import { Injectable } from '@nestjs/common';
import { GptService } from './gpt.service';

@Injectable()
export class IntentionsService {
  constructor(private gptService: GptService) {}

  async detectIntent(userInput: string) {
    const intentionsContext = [
      {
        role: 'system',
        content: `Você é um assistente de IA treinado para identificar a intenção (ação) do comando do usuário correspondente. Sua tarefa é responder com o nome da intenção correspondente às instruções fornecidas pelo usuário. Algumas das intenções disponíveis são:

- ewelink_action: para comandos relacionados ao controle de dispositivos inteligentes, como ligar/desligar dispositivos e ajustar configurações.
- general_knowledge: para perguntas gerais de conhecimento ou solicitações para gerar códigos em várias linguagens de programação, como JavaScript, C#, Python e outras.

Por exemplo, quando o usuário diz "GPT faça uma função que gere um número aleatório de 1 a 100 usando C#" ou "Me conte uma piada", a intenção correta é "general_knowledge".

Agora, por favor, identifique a intenção correta para o comando fornecido pelo usuário e responda apenas com o nome da intenção.`,
      },
    ];

    const validIntentions = ['ewelink_action', 'general_knowledge'];

    intentionsContext.push({ role: 'user', content: userInput });
    let gptResponse = await this.gptService.getGPT4Response(intentionsContext);

    if (validIntentions.includes(gptResponse)) {
      intentionsContext.push({ role: 'system', content: gptResponse });
    } else {
      intentionsContext.pop();
      gptResponse = 'general_knowledge';
    }
    return { gptResponse, userInput };
  }
}
