function activateJarvis() {
  console.log('Reconhecimento de voz ativado');
  return true;
}

function deactivateJarvis() {
  console.log('Reconhecimento de voz desativado');
  return false;
}

export { activateJarvis, deactivateJarvis };
