import { displayUserMessage, displayGPTMessage } from './displayMessages.js';
import detectIntent from './intentions.js';

async function processMessage(gptResponse, userMessage) {
  displayUserMessage(userMessage.userInput);
  displayGPTMessage(gptResponse, hljs);
}

export { processMessage };
