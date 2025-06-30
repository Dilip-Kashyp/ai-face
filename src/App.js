import { useState, useEffect } from "react";
import { handleQuery } from "./util/handleQuery";
import { speak } from "./util/speak";
import { startListening, stopListening } from "./util/listen";
import { getContextualThoughts } from "./util/thought";
import { getRandomExpression } from "./util/expressions";
import { useSpeechRecognition } from "react-speech-recognition";
import { eyeExpressions } from "./util/style";

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [eyeExpression, setEyeExpression] = useState("normal");
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [thoughtMessage, setThoughtMessage] = useState("");
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const { transcript, resetTranscript } = useSpeechRecognition({
    commands: [
      {
        command: "hello",
        callback: () => {
          resetTranscript();
          setIsProcessing(false);
          setIsActive(true);
          speak(
            "Yes, how can I help you?",
            setIsSpeaking,
            isActive,
            startListening,
            stopListening
          );
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.8,
      },
      {
        command: "thank you",
        callback: () => {
          resetTranscript();
          setIsProcessing(false);
          setIsActive(false);
          speak(
            "Goodbye! Say hello when you need me again.",
            setIsSpeaking,
            isActive,
            startListening,
            stopListening
          );
        },
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.8,
      },
    ],
  });

  useEffect(() => {
    if (isInitialized) {
      try {
        startListening();
      } catch (error) {
        setError("Failed to initialize speech recognition");
        setIsInitialized(false);
      }
    }

    return () => {
      stopListening();
      window.speechSynthesis.cancel();
    };
  }, [isInitialized]);

  useEffect(() => {
    if (isActive && !isSpeaking && transcript.trim()) {
      const trimmedTranscript = transcript.trim().toLowerCase();
      if (trimmedTranscript === "hello" || trimmedTranscript === "thank you") {
        return;
      }

      const handleTimeout = setTimeout(() => {
        handleQuery(
          transcript,
          setIsProcessing,
          resetTranscript,
          setIsSpeaking,
          isActive,
          startListening,
          stopListening
        );
      }, 2000);

      return () => clearTimeout(handleTimeout);
    }
  }, [transcript, isActive, isSpeaking, stopListening, resetTranscript]);

  useEffect(() => {
    let messageTimer = null;
    let cycleTimer = null;

    const getRandomMessage = (messages) =>
      messages[Math.floor(Math.random() * messages.length)];

    const updateThought = () => {
      if (!isActive || (isActive && !isSpeaking && !isProcessing)) {
        const contextualMessages = getContextualThoughts(
          isProcessing,
          isSpeaking,
          isActive
        );
        setThoughtMessage(getRandomMessage(contextualMessages));
        setEyeExpression(getRandomExpression());

        messageTimer = setTimeout(() => {
          setThoughtMessage("");
        }, 17000);
      } else {
        setThoughtMessage("");
      }
    };

    const startThoughtCycle = () => {
      if (!isActive || (isActive && !isSpeaking && !isProcessing)) {
        updateThought();
        cycleTimer = setTimeout(startThoughtCycle, 12000);
      }
    };

    startThoughtCycle();

    return () => {
      if (messageTimer) clearTimeout(messageTimer);
      if (cycleTimer) clearTimeout(cycleTimer);
    };
  }, [isActive, isSpeaking, isProcessing]);

  useEffect(() => {
    if (isProcessing) {
      setEyeExpression("confused");
    } else if (isSpeaking) {
      setEyeExpression("happy");
    } else if (isActive) {
      setEyeExpression("normal");
    } else {
      setEyeExpression("sleepy");
    }
  }, [isProcessing, isSpeaking, isActive]);

  useEffect(() => {
    const moveEyes = () => {
      const randomX = (Math.random() - 0.5) * 40;
      const randomY = (Math.random() - 0.5) * 40;
      setEyePosition({ x: randomX, y: randomY });
    };

    const movementInterval = setInterval(moveEyes, 2000); // Change position every 2 seconds

    return () => clearInterval(movementInterval);
  }, []);

  const handleEyeClick = () => {
    if (!isInitialized) {
      setIsInitialized(true);
      startListening(setIsSpeaking, isActive, startListening, stopListening);
    }
  };

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative">
      {/* Error Message */}
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 text-center animate-bounce">
          {error}
        </div>
      )}

      {/* Eyes Container */}
      <div
        className={`h-screen w-screen flex items-center justify-center gap-[30vw]
        ${isActive ? "animate-subtle-bounce" : ""}`}
      >
        {/* Left Eye */}
        <button
          onClick={handleEyeClick}
          className={`w-[20vw] h-[20vw] rounded-[3vw] relative cursor-pointer
            hover:scale-105 transition-transform duration-300
            animate-subtle-size-change
            ${
              eyeExpression !== "wink"
                ? "animate-[blink_4s_ease-in-out_infinite]"
                : ""
            }
            ${isActive ? "hover:brightness-110" : ""}`}
        >
          <div
            className={`absolute inset-0 blur-lg opacity-70 rounded-[8vw] 
            ${
              !isInitialized
                ? "animate-[color-shift_2s_ease-in-out_infinite]"
                : "bg-blue-500"
            }`}
          ></div>
          <div
            className={`absolute inset-0 rounded-[8vw] transition-all duration-700
            ${
              !isInitialized
                ? "animate-[color-shift_2s_ease-in-out_infinite]"
                : "bg-blue-600"
            }
            ${isProcessing ? "animate-spin" : ""}  
            ${eyeExpressions[eyeExpression] || eyeExpressions.normal}`}
            style={{
              transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
              transition: "transform 0.5s ease-out",
            }}
          ></div>
        </button>

        {/* Right Eye */}
        <div
          className={`w-[20vw] h-[20vw] rounded-[3vw] relative
          hover:scale-105 transition-transform duration-300
          animate-subtle-size-change
          ${
            eyeExpression !== "wink"
              ? "animate-[blink_4s_ease-in-out_infinite]"
              : ""
          }`}
        >
          <div
            className={`absolute inset-0 blur-lg opacity-70 rounded-[8vw] bg-blue-500`}
          ></div>
          <div
            className={`absolute inset-0 rounded-[8vw] transition-all duration-700
            bg-blue-600
            ${eyeExpressions[eyeExpression] || eyeExpressions.normal}`}
            style={{
              transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
              transition: "transform 0.5s ease-out",
            }}
          ></div>
        </div>
      </div>

      {/* Enhanced Thought Bubble */}
      {thoughtMessage && (
        <div className="fixed top-10 right-1 max-w-xs animate-float">
          <div
            className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg transform rotate-3
            border border-white/20 hover:scale-105 transition-transform duration-300"
          >
            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-white/10 backdrop-blur-md rounded-full"></div>
            <div className="absolute -bottom-6 -left-6 w-4 h-4 bg-white/10 backdrop-blur-md rounded-full"></div>
            <div className="absolute -bottom-8 -left-8 w-3 h-3 bg-white/10 backdrop-blur-md rounded-full"></div>

            <p className="font-mono text-lg text-white/90 leading-relaxed">
              {thoughtMessage}
            </p>

            <div
              className={`absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-75 animate-pulse`}
            ></div>
            <div
              className={`absolute bottom-2 left-2 w-2 h-2 bg-blue-400 rounded-full opacity-75 animate-pulse-slow`}
            ></div>
          </div>
        </div>
      )}

      {/* Status Text */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-blue-400 text-xl font-mono
        backdrop-blur-sm bg-black/20 px-6 py-2 rounded-full border border-white/10`}
      >
        {!isInitialized
          ? "Click an eye to initialize"
          : isProcessing
          ? "Processing..."
          : isSpeaking
          ? "Speaking..."
          : isActive
          ? "Listening..."
          : 'Say "Hello" to activate'}
      </div>
    </div>
  );
};

export default App;
