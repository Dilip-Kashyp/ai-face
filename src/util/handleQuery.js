import { getData } from "../api/apiHandler";
import { speak } from "./speak";

const QUERY_TIMEOUT = 10000; // 10 seconds timeout

export const handleQuery = async (
  query,
  setIsProcessing,
  resetTranscript,
  setIsSpeaking,
  isActive,
  startListening,
  stopListening
) => {
  setIsProcessing(true);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), QUERY_TIMEOUT);

    const response = await getData({ 
      query,
      signal: controller.signal 
    });
    
    clearTimeout(timeoutId);
    
    if (response) {
      speak(response, setIsSpeaking, isActive, startListening, stopListening);
    } else {
      throw new Error("Empty response received");
    }
  } catch (error) {
    console.error("Error handling query:", error);
    const errorMessage = error.name === 'AbortError' 
      ? "The request took too long to process. Please try again."
      : "An error occurred while processing your request.";
      
    speak(
      errorMessage,
      setIsSpeaking,
      isActive,
      startListening,
      stopListening
    );
  } finally {
    setIsProcessing(false);
    resetTranscript();
  }
};
