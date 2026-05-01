import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * FieldActionButton variants — each triggers a distinct visual grammar.
 */
export type FieldActionButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info'
  | 'governed';

/**
 * Props for the FieldActionButton component.
 *
 * @example
 * ```tsx
 * <FieldActionButton
 *   label="Confirm Patrol"
 *   icon={<ShieldIcon />}
 *   variant="primary"
 *   onPress={() => handleConfirm()}
 *   size="large"
 * />
 * ```
 */
export interface FieldActionButtonProps {
  /** Display label — keep concise for mobile. */
  label: string;
  /** Optional icon rendered before the label. */
  icon?: React.ReactNode;
  /** Visual variant governing colour and authority weight. */
  variant?: FieldActionButtonVariant;
  /** Size tier controlling touch target and font scale. */
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  /** Full-width mobile stretch. */
  block?: boolean;
  /** Disabled / governed-out state. */
  disabled?: boolean;
  /** Loading spinner state. */
  loading?: boolean;
  /** Press handler. */
  onPress: () => void;
  /** Long-press handler for secondary actions. */
  onLongPress?: () => void;
  /** Test id. */
  testId?: string;
  /** Additional className. */
  className?: string;
  /** ARIA label override. */
  ariaLabel?: string;
}

/**
 * FieldActionButton — large touch-friendly action button.
 *
 * Minimum 44 px tap target, scales up to 64 px for xlarge emergency actions.
 * Designed for gloved-hand operation in field conditions.
 */
export const FieldActionButton: React.FC<FieldActionButtonProps> = ({
  label,
  icon,
  variant = 'primary',
  size = 'large',
  block = true,
  disabled = false,
  loading = false,
  onPress,
  onLongPress,
  testId,
  className = '',
  ariaLabel,
}) => {
  const sizeClass = `tf-field-action-btn--${size}`;
  const variantClass = `tf-field-action-btn--${variant}`;
  const widthClass = block ? 'tf-field-action-btn--block' : '';
  const stateClass = disabled ? 'tf-field-action-btn--disabled' : '';
  const loadingClass = loading ? 'tf-field-action-btn--loading' : '';

  return (
    <button
      type="button"
      data-testid={testId}
      aria-label={ariaLabel || label}
      disabled={disabled || loading}
      onClick={onPress}
      onContextMenu={(e) => {
        e.preventDefault();
        onLongPress?.();
      }}
      className={[
        'tf-field-action-btn',
        sizeClass,
        variantClass,
        widthClass,
        stateClass,
        loadingClass,
        className,
      ].join(' ')}
    >
      {loading && (
        <span className="tf-field-action-btn__spinner" aria-hidden="true">
          ⟳
        </span>
      )}
      {!loading && icon && (
        <span className="tf-field-action-btn__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="tf-field-action-btn__label">{label}</span>
    </button>
  );
};

FieldActionButton.displayName = 'FieldActionButton';

export default FieldActionButton;
