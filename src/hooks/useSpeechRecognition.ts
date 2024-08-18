import { useEffect, useState } from 'react';

let recognition: any = null;
if (typeof window !== 'undefined') {
  if ('webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.webkitSpeechRecognition;

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
  }
}

export const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        setTranscript(prev => prev + ' ' + event.results[i][0].transcript);
      }
    };
  }, [isListening]);

  const startListening = () => {
    setTranscript('');
    setIsListening(true);

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: Boolean(recognition),
  };
};
