
import React, { useState, useRef } from 'react';
import { transcribeAudio } from '../services/gemini';

interface AudioSearchProps {
  onTranscription: (text: string) => void;
  lang: string;
}

const AudioSearch: React.FC<AudioSearchProps> = ({ onTranscription, lang }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          setIsProcessing(true);
          const transcription = await transcribeAudio(base64Audio, 'audio/webm');
          if (transcription) {
            onTranscription(transcription);
          }
          setIsProcessing(false);
          // Stop all tracks to release the microphone
          stream.getTracks().forEach(track => track.stop());
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <button
      type="button"
      onMouseDown={startRecording}
      onMouseUp={stopRecording}
      onMouseLeave={stopRecording}
      onTouchStart={startRecording}
      onTouchEnd={stopRecording}
      className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
        isRecording 
          ? 'bg-red-600 scale-110 shadow-red-500/50' 
          : isProcessing 
            ? 'bg-slate-800 animate-pulse' 
            : 'bg-white hover:bg-slate-50 text-slate-400 hover:text-[#E31E24]'
      }`}
      title={lang === 'de' ? "Halten zum Sprechen" : "Hold to speak"}
    >
      {isProcessing ? (
        <i className="fa-solid fa-circle-notch animate-spin text-xl text-white"></i>
      ) : (
        <i className={`fa-solid ${isRecording ? 'fa-microphone text-white animate-bounce' : 'fa-microphone text-xl'}`}></i>
      )}
      {isRecording && (
        <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full whitespace-nowrap uppercase tracking-widest shadow-xl">
          {lang === 'de' ? 'Aufnahme...' : 'Recording...'}
        </span>
      )}
    </button>
  );
};

export default AudioSearch;
