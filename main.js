import getGPT4Response from './gpt4.js';
import { getHomebridgeToken } from './homebridge.js';
let isListening = false;

console.log(getHomebridgeToken())
const output = document.getElementById('output');

const synth = window.speechSynthesis;

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'pt-BR';

recognition.onresult = async (event) => {
  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript.trim();
    if (event.results[i].isFinal) {
      console.log(transcript)
      if (transcript.toLowerCase() === 'jarvis escute') {
        if (!isListening) {
          isListening = true;
          console.log('Reconhecimento de voz ativado');
        }
      } else if (transcript.toLowerCase() === 'jarvis pare') {
        if (isListening) {
          isListening = false;
          console.log('Reconhecimento de voz desativado');
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
          const utterance = new SpeechSynthesisUtterance(response);
          utterance.lang = 'pt-BR';
          utterance.voice = synth
            .getVoices()
            .find((voice) => voice.name === 'Google português do Brasil, feminino');
          utterance.rate = 1.4;
          utterance.pitch = 1.0;
          utterance.onstart = () => {
            recognition.stop();
          };
          utterance.onend = () => {
            recognition.start();
          };
          synth.speak(utterance);
        }
        console.log('GPT-4 respondeu:', response);
      }
    }
  }
};

recognition.start();
