import { useEffect, useState } from 'react';

export const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        window?.SpeechRecognition || window?.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = async event => {
          let transcriptText = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcriptText += event.results[i][0].transcript;
          }

          setTranscript(prev => prev + transcriptText);
        };

        setRecognition(recognitionInstance);
      } else {
        throw new Error('Not supported in your browser');
      }
    }
  }, [isListening]);

  const startListening = () => {
    if (!recognition) return;

    setIsListening(true);
    recognition.start();
  };

  //Not working as expected
  const stopListening = () => {
    if (!recognition) return;

    setIsListening(false);
    recognition.stop();
  };

  const resetTranscript = () => setTranscript('');

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
  };
};
