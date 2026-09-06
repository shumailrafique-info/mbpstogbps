"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Minimal shape of the Web Speech API we rely on.
 *
 * TypeScript's DOM library does not ship these, and the vendor-prefixed
 * constructor is still the only one available in several browsers.
 */
type SpeechRecognitionAlternative = { transcript: string };

type SpeechRecognitionResult = {
  readonly isFinal: boolean;
  readonly length: number;
  [index: number]: SpeechRecognitionAlternative;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: {
    readonly length: number;
    [index: number]: SpeechRecognitionResult;
  };
};

type SpeechRecognitionErrorEventLike = { error: string };

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

function getConstructor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;

  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };

  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

const ERROR_MESSAGES: Record<string, string> = {
  "not-allowed": "Microphone access was blocked.",
  "service-not-allowed": "Microphone access was blocked.",
  "no-speech": "No speech detected. Try again.",
  "audio-capture": "No microphone was found.",
  network: "Speech recognition needs a network connection.",
};

export function useSpeechRecognition({
  onTranscript,
}: {
  onTranscript: (text: string) => void;
}) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  // Kept in a ref so the recognition handlers never close over a stale callback.
  const onTranscriptRef = useRef(onTranscript);
  onTranscriptRef.current = onTranscript;

  // Detection runs after mount, so the server and the first client render agree
  // and the button simply appears where the browser supports it.
  useEffect(() => {
    setSupported(getConstructor() !== null);
  }, []);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      recognitionRef.current = null;
    };
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const start = useCallback(() => {
    const Constructor = getConstructor();
    if (!Constructor) return;

    setError(null);

    const recognition = new Constructor();
    // Follows the browser's language, so dictation is not locked to English.
    recognition.lang = navigator.language || "en-US";
    recognition.continuous = true;
    // Only settled results are committed, so nothing is inserted twice as the
    // engine revises what it heard.
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      let chunk = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result?.isFinal) chunk += result[0]?.transcript ?? "";
      }

      const trimmed = chunk.trim();
      if (trimmed) onTranscriptRef.current(trimmed);
    };

    recognition.onerror = (event) => {
      setError(ERROR_MESSAGES[event.error] ?? "Speech recognition failed.");
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
      setListening(true);
    } catch {
      // start() throws if called while already running; treat it as a no-op.
      setListening(false);
    }
  }, []);

  const toggle = useCallback(() => {
    if (listening) {
      stop();
      return;
    }
    start();
  }, [listening, start, stop]);

  return { supported, listening, error, start, stop, toggle };
}
