import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Single header action.
 */
export interface HeaderAction {
  /** Action ID. */
  id: string;
  /** Icon element. */
  icon: React.ReactNode;
  /** ARIA label. */
  ariaLabel: string;
  /** Press handler. */
  onPress: () => void;
  /** Badge count. */
  badge?: number;
  /** Disabled state. */
  disabled?: boolean;
}

/**
 * Props for FieldHeaderActions.
 */
export interface FieldHeaderActionsProps {
  /** Array of header actions. */
  actions: HeaderAction[];
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldHeaderActions — header actions (right side).
 *
 * Renders a row of icon buttons on the right side of the field header.
 * Each action is 48 px touch target with optional badge.
 */
export const FieldHeaderActions: React.FC<FieldHeaderActionsProps> = ({
  actions,
  className = '',
  testId,
}) => {
  return (
    <div
      data-testid={testId}
      className={['tf-field-header-actions', className].join(' ')}
      role="group"
      aria-label="Header actions"
    >
      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          aria-label={action.ariaLabel}
          disabled={action.disabled}
          onClick={action.onPress}
          className="tf-field-header-actions__btn"
        >
          <span className="tf-field-header-actions__icon" aria-hidden="true">
            {action.icon}
          </span>
          {action.badge !== undefined && action.badge > 0 && (
            <span className="tf-field-header-actions__badge">
              {action.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

FieldHeaderActions.displayName = 'FieldHeaderActions';

export default FieldHeaderActions;
