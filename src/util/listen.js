import SpeechRecognition from "react-speech-recognition";

export const startListening = () => {
  try {
    return SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
    });
  } catch (error) {
    console.error("Error starting speech recognition:", error);
    throw error; // Propagate error for better error handling
  }
};

export const stopListening = () => {
  try {
    SpeechRecognition.stopListening();
  } catch (error) {
    console.error("Error stopping speech recognition:", error);
  }
};
