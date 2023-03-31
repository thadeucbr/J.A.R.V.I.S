import detectIntent from './intentions.js';
import getGPT4Response from './gpt4.js';
import { speak } from './voice.js';
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
      console.log(transcript)
      const intention = await detectIntent(transcript);
      if (transcript.toLowerCase() === 'jarvis escute') {
        if (!isListening) {
          isListening = activateJarvis();
        }
      } else if (transcript.toLowerCase() === 'jarvis pare') {
        if (isListening) {
          isListening = deactivateJarvis();
        }
      } else if (isListening && transcript.toLowerCase().includes('gpt')) {
        console.log('Você disse:', transcript);
        displayUserMessage(transcript); // Exibe a mensagem do usuário
        const response = await generalGPTConversation(transcript);
        displayGPTMessage(response); // Exibe a mensagem do GPT
      }
    }
  }
};

recognition.start();
