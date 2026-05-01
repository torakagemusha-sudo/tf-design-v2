import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Status option definition.
 */
export interface StatusOption {
  /** Option value. */
  value: string;
  /** Display label. */
  label: string;
  /** Severity colour. */
  color?: 'red' | 'amber' | 'green' | 'blue' | 'neutral';
  /** Icon. */
  icon?: React.ReactNode;
}

/**
 * Props for FieldStatusUpdate.
 */
export interface FieldStatusUpdateProps {
  /** Available status options. */
  options: StatusOption[];
  /** Currently selected value. */
  value: string;
  /** Change handler. */
  onChange: (value: string) => void;
  /** Update label. */
  label?: string;
  /** Disabled. */
  disabled?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldStatusUpdate — status update picker.
 *
 * Horizontal scrollable list of status pills for rapid status changes.
 * Each status is colour-coded for at-a-glance identification.
 * Selected status renders with filled background and checkmark.
 * Used for mission status, unit availability, and incident severity updates.
 */
export const FieldStatusUpdate: React.FC<FieldStatusUpdateProps> = ({
  options,
  value,
  onChange,
  label = 'Update Status',
  disabled = false,
  className = '',
  testId,
}) => {
  return (
    <div
      data-testid={testId}
      className={['tf-status-update', className].join(' ')}
      role="radiogroup"
      aria-label={label}
    >
      <span className="tf-status-update__label">{label}</span>

      <div className="tf-status-update__options">
        {options.map((option) => {
          const selected = option.value === value;
          const colorClass = option.color
            ? `tf-status-update__pill--${option.color}`
            : '';

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              onClick={() => onChange(option.value)}
              className={[
                'tf-status-update__pill',
                colorClass,
                selected ? 'tf-status-update__pill--selected' : '',
              ].join(' ')}
            >
              {option.icon && (
                <span className="tf-status-update__icon" aria-hidden="true">
                  {option.icon}
                </span>
              )}
              <span className="tf-status-update__text">{option.label}</span>
              {selected && (
                <span className="tf-status-update__check" aria-hidden="true">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

FieldStatusUpdate.displayName = 'FieldStatusUpdate';

export default FieldStatusUpdate;
