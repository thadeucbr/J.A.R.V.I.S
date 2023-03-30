import getGPT4Response from './gpt4.js';

const intentionsContext = [
  { role: "system", content: `Você é um assistente de IA treinado para identificar a itenção (ação) do comando do usuário correspondente:
  Exemplos:
- "Ligar a lâmpada do quarto": ewelink_action
- "Desligar o ventilador da sala": ewelink_action
- "Qual a temperatura do ar-condicionado do escritório?": ewelink_action
- "Ajustar a intensidade da luz da cozinha para 50%": ewelink_action
- "O que é a capital da França?": general_knowledge
` }
];
async function detectIntent(userInput) {
  intentionsContext.push({ role: 'user', content: userInput})
  const gptResponse = await getGPT4Response(intentionsContext);
  intentionsContext.push({role: "system", content: gptResponse})
  return { gptResponse, userInput };
}

export default detectIntent;