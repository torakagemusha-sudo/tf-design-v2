import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldDatePicker.
 */
export interface FieldDatePickerProps {
  /** Selected date value. */
  value: string | null;
  /** Change handler — returns ISO date string. */
  onChange: (date: string) => void;
  /** Field label. */
  label?: string;
  /** Placeholder. */
  placeholder?: string;
  /** Minimum selectable date. */
  minDate?: string;
  /** Maximum selectable date. */
  maxDate?: string;
  /** Disabled state. */
  disabled?: boolean;
  /** Error message. */
  error?: string;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldDatePicker — mobile date picker.
 *
 * Wraps a native date input with styled presentation.
 * Opens the device's native date picker for consistent mobile UX.
 * Min/max date constraints prevent invalid selections.
 * Formatted display string shown when a date is selected.
 */
export const FieldDatePicker: React.FC<FieldDatePickerProps> = ({
  value,
  onChange,
  label = 'Date',
  placeholder = 'Select date',
  minDate,
  maxDate,
  disabled = false,
  error,
  className = '',
  testId,
}) => {
  const displayValue = value
    ? new Date(value).toLocaleDateString()
    : '';

  return (
    <div
      data-testid={testId}
      className={[
        'tf-date-picker',
        error ? 'tf-date-picker--error' : '',
        disabled ? 'tf-date-picker--disabled' : '',
        className,
      ].join(' ')}
    >
      {label && (
        <label className="tf-date-picker__label">{label}</label>
      )}

      <div className="tf-date-picker__control">
        {/* Native date input (hidden visually, functional) */}
        <input
          type="date"
          value={value || ''}
          min={minDate}
          max={maxDate}
          disabled={disabled}
          aria-label={label}
          className="tf-date-picker__input"
          onChange={(e) => e.target.value && onChange(e.target.value)}
        />

        {/* Display value */}
        <span className="tf-date-picker__display">
          {displayValue || placeholder}
        </span>

        {/* Calendar icon */}
        <span className="tf-date-picker__icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </span>
      </div>

      {error && (
        <span className="tf-date-picker__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

FieldDatePicker.displayName = 'FieldDatePicker';

export default FieldDatePicker;
