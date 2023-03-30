export default function indexSkills({ gptResponse, userInput }) {
  if(gptResponse === 'ewelink_action') {
    console.log('commando:', userInput)
  }
}