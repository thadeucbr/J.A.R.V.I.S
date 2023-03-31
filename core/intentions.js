import getGPT4Response from './gpt4.js';

const validIntentions = ['ewelink_action', 'general_knowledge'];

const intentionsContext = [
  { role: "system", content: `Você é um assistente de IA treinado para identificar a intenção (ação) do comando do usuário correspondente. Sua tarefa é responder com o nome da intenção correspondente às instruções fornecidas pelo usuário. Algumas das intenções disponíveis são:

- ewelink_action: para comandos relacionados ao controle de dispositivos inteligentes, como ligar/desligar dispositivos e ajustar configurações.
- general_knowledge: para perguntas gerais de conhecimento ou solicitações para gerar códigos em várias linguagens de programação, como JavaScript, C#, Python e outras.

Por exemplo, quando o usuário diz "GPT faça uma função que gere um número aleatório de 1 a 100 usando C#" ou "Me conte uma piada", a intenção correta é "general_knowledge".

Agora, por favor, identifique a intenção correta para o comando fornecido pelo usuário e responda apenas com o nome da intenção.` }
];

async function detectIntent(userInput) {
  intentionsContext.push({ role: 'user', content: userInput });
  let gptResponse = await getGPT4Response(intentionsContext);

  if (validIntentions.includes(gptResponse)) {
    console.log('ENTROU AQUI!');
    intentionsContext.push({ role: "system", content: gptResponse });
  } else {
    intentionsContext.pop();
    gptResponse = 'general_knowledge';
  }
  console.log(gptResponse);
  return { gptResponse, userInput };
}

export default detectIntent;
