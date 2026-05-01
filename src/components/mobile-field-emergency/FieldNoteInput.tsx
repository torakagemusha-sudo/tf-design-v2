import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldNoteInput.
 */
export interface FieldNoteInputProps {
  /** Current note text. */
  value: string;
  /** Change handler. */
  onChange: (text: string) => void;
  /** Submit handler. */
  onSubmit?: () => void;
  /** Placeholder. */
  placeholder?: string;
  /** Max characters. */
  maxLength?: number;
  /** Character count display. */
  showCount?: boolean;
  /** Auto-expand textarea. */
  autoExpand?: boolean;
  /** Submit label. */
  submitLabel?: string;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldNoteInput — quick note input.
 *
 * Auto-expanding textarea for rapid field notes.
 * Character count prevents overrun of backend limits.
 * Submit button anchored below for thumb reachability.
 * Optimised for one-handed operation while on the move.
 */
export const FieldNoteInput: React.FC<FieldNoteInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Add a note...',
  maxLength = 500,
  showCount = true,
  autoExpand = true,
  submitLabel = 'Save Note',
  className = '',
  testId,
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (autoExpand && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, autoExpand]);

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit?.();
  };

  return (
    <div
      data-testid={testId}
      className={['tf-note-input', className].join(' ')}
    >
      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={2}
        aria-label="Note input"
        className="tf-note-input__textarea"
        onChange={(e) => onChange(e.target.value)}
      />

      {/* Footer */}
      <div className="tf-note-input__footer">
        {/* Character count */}
        {showCount && maxLength && (
          <span
            className="tf-note-input__count"
            aria-live="polite"
          >
            {value.length}/{maxLength}
          </span>
        )}

        {/* Submit */}
        {onSubmit && (
          <button
            type="button"
            className="tf-note-input__submit"
            onClick={handleSubmit}
            disabled={!value.trim()}
          >
            {submitLabel}
          </button>
        )}
      </div>
    </div>
  );
};

FieldNoteInput.displayName = 'FieldNoteInput';

export default FieldNoteInput;
