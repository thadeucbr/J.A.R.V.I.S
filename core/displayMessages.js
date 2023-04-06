const output = document.getElementById('output');

function displayUserMessage(message) {
  const messageElement = `
    <div class="message user">
      <div class="message-content">${message}</div>
    </div>
  `;
  output.innerHTML += messageElement;
}

function displayGPTMessage(message, hljs) {
  let messageContent = '';

  // Escapar caracteres especiais de HTML
  const escapeHtml = (text) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  message = escapeHtml(message);

  if (message.includes('```')) {
    const codeRegex = /```([^`]+)```/g;
    const codeMatch = message.match(codeRegex);

    if (codeMatch && codeMatch.length > 0) {
      const code = codeMatch[0].slice(3, -3);

      messageContent = `
        <div class="code">
          <pre><code>${code}</code></pre>
        </div>
      `;
      
      const explanation = message.replace(codeRegex, '').trim();
      if (explanation) {
        messageContent = `<p>${explanation}</p>` + messageContent;
      }
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

  // Aplicar highlight.js a todos os blocos de código
  const codeBlocks = output.querySelectorAll('pre code');
  for (const block of codeBlocks) {
    hljs.highlightElement(block);
  }
}


export { displayUserMessage, displayGPTMessage };
