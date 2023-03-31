import getGPT4Response from '../core/gpt4.js';

const generalGPTContext = [
  { role: "system", content: "Você é um assistente virtual inteligente pronto para responder a perguntas sobre qualquer coisa que o usuário desejar conversar." }
];

async function generalGPTConversation(userInput) {
  generalGPTContext.push({ role: 'user', content: userInput });
  const gptResponse = await getGPT4Response(generalGPTContext);
  generalGPTContext.push({ role: 'assistant', content: gptResponse });
  return gptResponse;
}

export default generalGPTConversation;
