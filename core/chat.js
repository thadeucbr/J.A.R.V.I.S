const output = document.getElementById('output');

function displayUserMessage(message) {
  const messageElement = `
    <div class="message user">
      <div class="message-content">${message}</div>
    </div>
  `;
  output.innerHTML += messageElement;
}

function displayGPTMessage(message) {
  let messageContent = '';

  if (message.includes('`')) {
    const codeRegex = /`([^`]+)`/g;
    const codeMatch = message.match(codeRegex);

    if (codeMatch && codeMatch.length > 0) {
      let code = codeMatch[0].slice(1, -1); // Remove os delimitadores de código (`) antes de exibir

      // Adicione estas linhas para destacar variáveis e funções
      code = code
        .replace(
          /(\b(?:const|let|var)\s+)([a-zA-Z_$][0-9a-zA-Z_$]*)/g,
          '$1<span class="variable">$2</span>'
        )
        .replace(
          /(\bfunction\s+)([a-zA-Z_$][0-9a-zA-Z_$]*)/g,
          '$1<span class="function">$2</span>'
        );

      messageContent = `
        <div class="code">
          <pre><code>${code}</code></pre>
        </div>
      `;
    }
  } else {
    messageContent = message;
  }

  const messageElement = `
    <div class="message gpt">
      <div class="message-content">${messageContent}</div>
    </div>
  `;
  output.innerHTML += messageElement;
}

export { displayUserMessage, displayGPTMessage };
