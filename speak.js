export function testAllVoices() {
    // Get all available voices
    const voices = window.speechSynthesis.getVoices();
    
    // If no voices found
    if (voices.length === 0) {
        console.log('No voices found');
        alert('No voices found on this device');
        return;
    }

    // Test text - using both English and Hindi for better testing
    const testText = "Hello, this is a test. नमस्ते, यह एक परीक्षण है।";

    // Test each available voice
    voices.forEach(voice => {
        const utterance = new SpeechSynthesisUtterance(testText);
        utterance.voice = voice;
        utterance.rate = 1;
        utterance.pitch = 1;
        
        console.log(`Testing voice: ${voice.name} - (${voice.lang})`);
        window.speechSynthesis.speak(utterance);
    });
}