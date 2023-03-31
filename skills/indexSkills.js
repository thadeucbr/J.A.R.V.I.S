import generalGPTConversation from './generalGPT.js';

const skills = {
  general_knowledge: generalGPTConversation,
  // Adicione outras habilidades aqui
};

export default function executeSkill({ gptResponse, userInput }) {
  console.log('EEEEEEEEEEEEEEEEEEEEEE>', gptResponse)
  if (skills[gptResponse]) {
    return skills[gptResponse](userInput);
  } else {
    throw new Error(`Skill "${gptResponse}" não encontrada.`);
  }
}