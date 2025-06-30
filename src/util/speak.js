const getPreferredVoice = (voices) => {
  // Find the exact Google Hindi voice by name
  const preferredVoice = voices.find((voice) => voice.name === "Google हिन्दी");
  
  // Fallback to other Hindi voices if the exact match isn't available
  if (!preferredVoice) {
    const hindiVoices = voices.filter(
      (voice) => voice.lang === "hi-IN" || voice.lang.startsWith("hi")
    );
    return hindiVoices[0] || voices[0]; // Fallback to the first available voice
  }
  
  return preferredVoice;
};


  export const speak = (
    text,
    setIsSpeaking,
    isActive,
    startListening,
    stopListening
  ) => {
    if (!text) {
      console.error("No text provided to speak");
      return;
    }

    const performSpeech = () => {
      try {
        window.speechSynthesis.cancel();
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        let currentSentence = 0;

        const speakNextSentence = () => {
          if (currentSentence < sentences.length) {
            const utterance = new SpeechSynthesisUtterance(
              sentences[currentSentence].trim()
            );

            const voices = window.speechSynthesis.getVoices();
            utterance.voice = getPreferredVoice(voices);

            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.volume = 1;
            utterance.lang = "hi-IN";

            utterance.onend = () => {
              currentSentence++;
              if (currentSentence < sentences.length) {
                speakNextSentence();
              } else {
                setIsSpeaking(false);
                if (isActive) {
                  startListening();
                }
              }
            };

            utterance.onerror = (error) => {
              console.error("Speech synthesis error:", error);
              setIsSpeaking(false);
              if (isActive) {
                startListening();
              }
            };

            if (currentSentence === 0) {
              setIsSpeaking(true);
              stopListening();
            }

            window.speechSynthesis.speak(utterance);
          }
        };

        speakNextSentence();
      } catch (error) {
        console.error("Speech synthesis error:", error);
        setIsSpeaking(false);
        if (isActive) startListening();
      }
    };
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setTimeout(performSpeech, 100);
    } else {
      performSpeech();
    }
  };




