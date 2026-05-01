import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Visual variant for an action sheet item.
 */
export type FieldActionSheetItemVariant =
  | 'default'
  | 'destructive'
  | 'cancel'
  | 'governed';

/**
 * Props for FieldActionSheetItem.
 */
export interface FieldActionSheetItemProps {
  /** Display label. */
  label: string;
  /** Optional icon rendered to the left. */
  icon?: React.ReactNode;
  /** Visual variant. */
  variant?: FieldActionSheetItemVariant;
  /** Disabled state. */
  disabled?: boolean;
  /** Press handler. */
  onPress: () => void;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
  /** ARIA label override. */
  ariaLabel?: string;
}

/**
 * FieldActionSheetItem — individual selectable item within a FieldActionSheet.
 *
 * 56 px minimum touch target, full-width row with icon + label layout.
 * Destructive variant renders in alert red; cancel variant is pinned at the bottom.
 */
export const FieldActionSheetItem: React.FC<FieldActionSheetItemProps> = ({
  label,
  icon,
  variant = 'default',
  disabled = false,
  onPress,
  className = '',
  testId,
  ariaLabel,
}) => {
  const variantClass = `tf-action-sheet-item--${variant}`;
  const stateClass = disabled ? 'tf-action-sheet-item--disabled' : '';

  return (
    <button
      type="button"
      data-testid={testId}
      role="menuitem"
      aria-label={ariaLabel || label}
      disabled={disabled}
      onClick={onPress}
      className={[
        'tf-action-sheet-item',
        variantClass,
        stateClass,
        className,
      ].join(' ')}
    >
      {icon && (
        <span className="tf-action-sheet-item__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="tf-action-sheet-item__label">{label}</span>
    </button>
  );
};

FieldActionSheetItem.displayName = 'FieldActionSheetItem';

export default FieldActionSheetItem;
