import generalGPTConversation from './generalGPT.js';

const skills = {
  general_knowledge: generalGPTConversation
};

export default function executeSkill({ gptResponse, userInput }) {
  if (skills[gptResponse]) {
    return skills[gptResponse](userInput);
  } else {
    throw new Error(`Skill "${gptResponse}" não encontrada.`);
  }
}