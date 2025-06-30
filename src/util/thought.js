export const thoughtCategories = {
  philosophical: [
    "What if code is just poetry for computers?",
    "Do virtual assistants dream of digital sheep?",
    "Is the cloud just someone else's computer?",
    "Are bugs just unexpected features?",
    "What if AI becomes too smart for small talk?",
  ],
  playful: [
    "Loading witty response...",
    "Brain.exe is thinking...",
    "Calculating meaning of life...",
    "Downloading more RAM...",
    "Searching for my sense of humor...",
  ],
  curious: [
    "I wonder if robots can taste binary...",
    "Do humans dream in RGB or CMYK?",
    "Why don't keyboards have a hug button?",
    "Can WiFi signals get tangled?",
    "Do computers get tired of computing?",
  ],
  sleepy: [
    "Zzzz... Processing dreams...",
    "Time for a power nap...",
    "Low battery mode activated...",
    "Counting electric sheep...",
    "System hibernate imminent...",
  ],
};

export const getContextualThoughts = (isProcessing, isSpeaking, isActive) => {
  if (isProcessing) return thoughtCategories.playful;
  if (isSpeaking) return thoughtCategories.curious;
  if (isActive) return thoughtCategories.philosophical;
  return thoughtCategories.sleepy;
};
