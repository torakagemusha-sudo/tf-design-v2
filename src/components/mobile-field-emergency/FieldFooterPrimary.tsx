import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldFooterPrimary.
 */
export interface FieldFooterPrimaryProps {
  /** Button label. */
  label: string;
  /** Press handler. */
  onPress: () => void;
  /** Icon element. */
  icon?: React.ReactNode;
  /** Variant. */
  variant?: 'primary' | 'danger' | 'governed';
  /** Loading state. */
  loading?: boolean;
  /** Disabled state. */
  disabled?: boolean;
  /** Full width within footer. */
  block?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldFooterPrimary — primary action in footer.
 *
 * Full-width or flex-grow button anchored in the footer.
 * Minimum 56 px height for reliable thumb reachability.
 * Primary variant uses the accent colour; danger for destructive actions.
 */
export const FieldFooterPrimary: React.FC<FieldFooterPrimaryProps> = ({
  label,
  onPress,
  icon,
  variant = 'primary',
  loading = false,
  disabled = false,
  block = true,
  className = '',
  testId,
}) => {
  const variantClass = `tf-field-footer-primary--${variant}`;
  const blockClass = block ? 'tf-field-footer-primary--block' : '';

  return (
    <button
      type="button"
      data-testid={testId}
      aria-label={label}
      disabled={disabled || loading}
      onClick={onPress}
      className={[
        'tf-field-footer-primary',
        variantClass,
        blockClass,
        className,
      ].join(' ')}
    >
      {loading && (
        <span className="tf-field-footer-primary__spinner" aria-hidden="true">
          ⟳
        </span>
      )}
      {!loading && icon && (
        <span className="tf-field-footer-primary__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="tf-field-footer-primary__label">
        {loading ? 'Loading...' : label}
      </span>
    </button>
  );
};

FieldFooterPrimary.displayName = 'FieldFooterPrimary';

export default FieldFooterPrimary;
