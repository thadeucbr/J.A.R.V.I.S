import detectIntent from './intentions.js';
import getGPT4Response from './gpt4.js';
import { speak } from './voice.js';
import { activateJarvis, deactivateJarvis } from './core/jarvisControl.js';
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
        const response = await getGPT4Response(transcript);
        if (response.includes('`')) {
          const codeRegex = /`([^`]+)`/g;
          const codeMatch = response.match(codeRegex);

          if (codeMatch && codeMatch.length > 0) {
            const code = codeMatch[0];

            output.innerHTML = `
          <div class="message received">
            <div class="message-content">
              <div class="code">${code}</div>
            </div>
          </div>
        `;
          }
        } else {
          speak(response);
          console.log('GPT-4 respondeu:', response);
        }
      }
    }
  }
};

recognition.start();
