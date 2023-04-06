const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach((node) => {
        if (node.querySelector) {
          const codeElements = node.querySelectorAll('pre code');
          codeElements.forEach((codeElement) => {
            hljs.highlightElement(codeElement);
          });
        }
      });
    }
  });
});

const output = document.getElementById('output');
observer.observe(output, { childList: true });
