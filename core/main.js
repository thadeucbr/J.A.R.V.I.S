import detectIntent from './intentions.js';
import executeSkill from '../skills/indexSkills.js';
import { processMessage } from './chat.js';

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
        const response = await executeSkill(intent);
        processMessage(response, intent)
      }
    }
  // }
};

recognition.start();
