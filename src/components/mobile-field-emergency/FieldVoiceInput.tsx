import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldVoiceInput.
 */
export interface FieldVoiceInputProps {
  /** Called when speech is transcribed. */
  onTranscript: (text: string) => void;
  /** Called on recording error. */
  onError?: (error: Error) => void;
  /** Placeholder text. */
  placeholder?: string;
  /** Recording label. */
  recordingLabel?: string;
  /** Language code. */
  language?: string;
  /** Maximum recording duration in seconds. */
  maxDuration?: number;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldVoiceInput — voice input.
 *
 * Wraps the Web Speech API for hands-free voice transcription.
 * Large microphone button for gloved-hand operation.
 * Visual waveform animation during recording.
 * Auto-stops at maxDuration to prevent runaway recording.
 */
export const FieldVoiceInput: React.FC<FieldVoiceInputProps> = ({
  onTranscript,
  onError,
  placeholder = 'Tap microphone and speak...',
  recordingLabel = 'Listening...',
  language = 'en-US',
  maxDuration = 60,
  className = '',
  testId,
}) => {
  const [isRecording, setIsRecording] = React.useState(false);
  const [transcript, setTranscript] = React.useState('');
  const [elapsed, setElapsed] = React.useState(0);
  const recognitionRef = React.useRef<SpeechRecognition | null>(null);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const startRecording = () => {
    try {
      const SpeechRecognitionAPI =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognitionAPI) {
        onError?.(new Error('Speech recognition not supported'));
        return;
      }

      const recognition = new SpeechRecognitionAPI();
      recognition.lang = language;
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let final = '';
        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          }
        }
        if (final) {
          setTranscript(final);
          onTranscript(final);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        onError?.(new Error(`Speech recognition error: ${event.error}`));
        stopRecording();
      };

      recognition.onend = () => {
        stopRecording();
      };

      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
      setElapsed(0);

      timerRef.current = setInterval(() => {
        setElapsed((prev) => {
          if (prev >= maxDuration - 1) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      onError?.(err instanceof Error ? err : new Error('Failed to start recording'));
    }
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  React.useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  return (
    <div
      data-testid={testId}
      className={[
        'tf-voice-input',
        isRecording ? 'tf-voice-input--recording' : '',
        className,
      ].join(' ')}
    >
      {/* Transcript display */}
      <div className="tf-voice-input__transcript">
        {transcript || (
          <span className="tf-voice-input__placeholder">{placeholder}</span>
        )}
      </div>

      {/* Recording controls */}
      <div className="tf-voice-input__controls">
        {/* Mic button */}
        <button
          type="button"
          className="tf-voice-input__mic-btn"
          onClick={isRecording ? stopRecording : startRecording}
          aria-label={isRecording ? 'Stop recording' : 'Start recording'}
        >
          <span className="tf-voice-input__mic-icon" aria-hidden="true">
            {isRecording ? '⏹' : '🎤'}
          </span>
        </button>

        {/* Status */}
        <div className="tf-voice-input__status">
          {isRecording ? (
            <>
              <span className="tf-voice-input__recording-label">
                {recordingLabel}
              </span>
              <span className="tf-voice-input__timer">
                {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, '0')} / {maxDuration}s
              </span>
              {/* Waveform bars */}
              <div className="tf-voice-input__waveform" aria-hidden="true">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="tf-voice-input__wave-bar"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <span className="tf-voice-input__hint">Tap to speak</span>
          )}
        </div>
      </div>
    </div>
  );
};

FieldVoiceInput.displayName = 'FieldVoiceInput';

export default FieldVoiceInput;
