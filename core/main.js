import detectIntent from './intentions.js';
import getGPT4Response from './gpt4.js';
import { speak } from './voice.js';
import executeSkill from '../skills/indexSkills.js';
import { activateJarvis, deactivateJarvis } from './jarvisControl.js';
import { displayUserMessage, displayGPTMessage } from './chat.js';
import generalGPTConversation from '../skills/generalGPT.js';

let isListening = false;

const output = document.getElementById('output');

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'pt-BR';

recognition.onresult = async (event) => {
  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript.trim();
    if (event.results[i].isFinal) {
      // if (transcript.toLowerCase().includes('gpt')) {
        const intent = await detectIntent(transcript);
        console.log('Você disse:', intent);
        displayUserMessage(intent.userInput); // Exibe a mensagem do usuário
        const response = await executeSkill(intent);
        displayGPTMessage(response); // Exibe a mensagem do GPT
      }
    }
  // }
};

recognition.start();
