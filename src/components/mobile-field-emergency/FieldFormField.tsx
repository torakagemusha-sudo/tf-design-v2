import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldFormField.
 */
export interface FieldFormFieldProps {
  /** Field label. */
  label: string;
  /** Input element (controlled). */
  children: React.ReactNode;
  /** Helper text below input. */
  helperText?: string;
  /** Error message. */
  error?: string;
  /** Required indicator. */
  required?: boolean;
  /** Disabled state. */
  disabled?: boolean;
  /** Label position. */
  labelPosition?: 'above' | 'inline';
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldFormField — mobile-optimised form field.
 *
 * 56 px minimum input height for thumb-friendly interaction.
label renders above the input with required asterisk.
 * Error message displays below with red severity colour.
 * Helper text provides context without cluttering the label.
 */
export const FieldFormField: React.FC<FieldFormFieldProps> = ({
  label,
  children,
  helperText,
  error,
  required = false,
  disabled = false,
  labelPosition = 'above',
  className = '',
  testId,
}) => {
  const hasError = !!error;
  const errorClass = hasError ? 'tf-form-field--error' : '';
  const disabledClass = disabled ? 'tf-form-field--disabled' : '';
  const labelClass = `tf-form-field--label-${labelPosition}`;

  return (
    <div
      data-testid={testId}
      className={[
        'tf-form-field',
        errorClass,
        disabledClass,
        labelClass,
        className,
      ].join(' ')}
    >
      {/* Label */}
      <label className="tf-form-field__label">
        {label}
        {required && (
          <span className="tf-form-field__required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>

      {/* Input area */}
      <div className="tf-form-field__input">{children}</div>

      {/* Helper text */}
      {helperText && !hasError && (
        <span className="tf-form-field__helper">{helperText}</span>
      )}

      {/* Error */}
      {hasError && (
        <span className="tf-form-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

FieldFormField.displayName = 'FieldFormField';

export default FieldFormField;
