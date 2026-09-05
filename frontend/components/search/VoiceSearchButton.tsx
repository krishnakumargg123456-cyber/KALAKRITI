"use client";

import { Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/locales";

type VoiceSearchButtonProps = {
  onTranscript: (value: string) => void;
  label: string;
  locale: Locale;
};

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: {
    results: {
      [index: number]: {
        [index: number]: {
          transcript: string;
        };
      };
      length: number;
    };
  }) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

const VOICE_LOCALES: Record<Locale, string> = {
  en: "en-IN",
  hi: "hi-IN",
  bn: "bn-IN",
  gu: "gu-IN",
  mr: "mr-IN",
  pa: "pa-IN",
  ta: "ta-IN",
  te: "te-IN",
  kn: "kn-IN",
  ml: "ml-IN",
  or: "or-IN",
  as: "as-IN",
  ne: "ne-NP",
  ks: "ks-IN",
  kok: "kok-IN",
  mai: "mai-IN",
  sa: "sa-IN",
};

export default function VoiceSearchButton({
  onTranscript,
  label,
  locale,
}: VoiceSearchButtonProps) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    const browserWindow = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };

    setSupported(
      Boolean(
        browserWindow.SpeechRecognition ||
          browserWindow.webkitSpeechRecognition
      )
    );

    return () => {
      recognitionRef.current?.stop();
      recognitionRef.current = null;
    };
  }, []);

  const startListening = () => {
    if (!supported || listening) return;

    const browserWindow = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };

    const SpeechRecognitionAPI =
      browserWindow.SpeechRecognition ||
      browserWindow.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognitionAPI();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = VOICE_LOCALES[locale];

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();

      if (transcript) {
        onTranscript(transcript);
      }
    };

    recognition.onerror = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    setListening(true);

    try {
      recognition.start();
    } catch {
      setListening(false);
      recognitionRef.current = null;
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setListening(false);
  };

  if (!supported) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={listening ? stopListening : startListening}
      aria-label={label}
      aria-pressed={listening}
      title={label}
      className={`mr-1 flex h-10 w-10 shrink-0 items-center justify-center border transition ${
        listening
          ? "border-[#8b1e2d] bg-[#8b1e2d] text-[#fff8eb]"
          : "border-transparent text-[#8b1e2d] hover:border-[#b08a4a]/40 hover:bg-[#efe4ce]"
      }`}
    >
      {listening ? (
        <MicOff className="h-5 w-5" />
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </button>
  );
}
