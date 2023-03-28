import getGPT4Response from './gpt4.js';

const output = document.getElementById('output');

const synth = window.speechSynthesis;

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'pt-BR';

recognition.onresult = async (event) => {
  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript.trim();
    if (event.results[i].isFinal) {
      console.log(transcript)
      if (transcript.toLowerCase().includes('gpt')) {
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
          utterance.lang = 'pt-BR'; // definir o idioma da fala
          utterance.voice = synth
            .getVoices()
            .find((voice) => voice.name === 'Google português do Brasil, feminino'); // escolher uma voz disponível
          utterance.rate = 1.4; // diminuir a velocidade da fala
          utterance.pitch = 1.0; // aumentar o tom da fala
          utterance.onstart = () => {
            recognition.stop();
          };
          utterance.onend = () => {
            recognition.start();
          };
          synth.speak(utterance);
        }
        console.log('GPT-4 respondeu:', response);
        // responsiveVoice.onstart = () => {
        //   recognition.stop();
        // };
        // responsiveVoice.onend = () => {
        //   recognition.start();
        // };
        // responsiveVoice.speak(response, 'Brazilian Portuguese Female');
      }
    }
  }
};

startButton.addEventListener('click', () => {
  recognition.start();
});

stopButton.addEventListener('click', () => {
  recognition.stop();
});
