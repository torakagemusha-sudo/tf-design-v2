import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldTimePicker.
 */
export interface FieldTimePickerProps {
  /** Selected time value (HH:mm). */
  value: string | null;
  /** Change handler. */
  onChange: (time: string) => void;
  /** Field label. */
  label?: string;
  /** Placeholder. */
  placeholder?: string;
  /** 15-minute intervals. */
  minuteStep?: number;
  /** Disabled. */
  disabled?: boolean;
  /** Error. */
  error?: string;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldTimePicker — mobile time picker.
 *
 * Native time input wrapper with styled display.
 * Supports configurable minute intervals for shift scheduling.
 * 24-hour format optimised for emergency and military operations.
 */
export const FieldTimePicker: React.FC<FieldTimePickerProps> = ({
  value,
  onChange,
  label = 'Time',
  placeholder = 'Select time',
  minuteStep = 15,
  disabled = false,
  error,
  className = '',
  testId,
}) => {
  const displayValue = value || '';

  return (
    <div
      data-testid={testId}
      className={[
        'tf-time-picker',
        error ? 'tf-time-picker--error' : '',
        disabled ? 'tf-time-picker--disabled' : '',
        className,
      ].join(' ')}
    >
      {label && (
        <label className="tf-time-picker__label">{label}</label>
      )}

      <div className="tf-time-picker__control">
        {/* Native time input */}
        <input
          type="time"
          value={displayValue}
          step={minuteStep * 60}
          disabled={disabled}
          aria-label={label}
          className="tf-time-picker__input"
          onChange={(e) => e.target.value && onChange(e.target.value)}
        />

        {/* Display */}
        <span className="tf-time-picker__display">
          {displayValue || placeholder}
        </span>

        {/* Clock icon */}
        <span className="tf-time-picker__icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </span>
      </div>

      {error && (
        <span className="tf-time-picker__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

FieldTimePicker.displayName = 'FieldTimePicker';

export default FieldTimePicker;
