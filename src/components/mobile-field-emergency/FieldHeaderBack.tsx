import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldHeaderBack.
 */
export interface FieldHeaderBackProps {
  /** Back handler. */
  onPress: () => void;
  /** Custom label — defaults to empty (icon only). */
  label?: string;
  /** Custom icon element. */
  icon?: React.ReactNode;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldHeaderBack — back button for field header.
 *
 * 48 px minimum touch target. Positioned left of the header title.
 * Icon-only by default; optional label for accessibility.
 */
export const FieldHeaderBack: React.FC<FieldHeaderBackProps> = ({
  onPress,
  label,
  icon,
  className = '',
  testId,
}) => {
  return (
    <button
      type="button"
      data-testid={testId}
      aria-label={label || 'Go back'}
      onClick={onPress}
      className={['tf-field-header-back', className].join(' ')}
    >
      <span className="tf-field-header-back__icon" aria-hidden="true">
        {icon || (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        )}
      </span>
      {label && (
        <span className="tf-field-header-back__label">{label}</span>
      )}
    </button>
  );
};

FieldHeaderBack.displayName = 'FieldHeaderBack';

export default FieldHeaderBack;
