export const speakText = (text) => {
    if (!window.speechSynthesis) return;
  
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 1;   // max volume
    utterance.rate = 1;     // normal speed
    utterance.pitch = 1.2;  // slightly higher pitch
    window.speechSynthesis.speak(utterance);
  };
  