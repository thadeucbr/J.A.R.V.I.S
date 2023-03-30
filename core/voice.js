const synth = window.speechSynthesis;

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  utterance.voice = synth
    .getVoices()
    .find((voice) => voice.name === 'Google português do Brasil, feminino');
  utterance.rate = 1.4;
  utterance.pitch = 1.0;

  synth.speak(utterance);
}

export { speak };