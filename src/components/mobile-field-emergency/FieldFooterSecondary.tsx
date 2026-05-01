import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Single secondary action.
 */
export interface SecondaryAction {
  /** Action ID. */
  id: string;
  /** Label. */
  label: string;
  /** Icon. */
  icon?: React.ReactNode;
  /** Press handler. */
  onPress: () => void;
  /** Disabled. */
  disabled?: boolean;
}

/**
 * Props for FieldFooterSecondary.
 */
export interface FieldFooterSecondaryProps {
  /** Secondary actions. */
  actions: SecondaryAction[];
  /** Layout mode. */
  layout?: 'row' | 'column';
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldFooterSecondary — secondary actions in footer.
 *
 * Renders one or more secondary action buttons alongside the primary.
 * Row layout places buttons side by side; column stacks vertically.
 * Each button is 48 px minimum for thumb-friendly operation.
 */
export const FieldFooterSecondary: React.FC<FieldFooterSecondaryProps> = ({
  actions,
  layout = 'row',
  className = '',
  testId,
}) => {
  const layoutClass = `tf-field-footer-secondary--${layout}`;

  return (
    <div
      data-testid={testId}
      className={['tf-field-footer-secondary', layoutClass, className].join(' ')}
      role="group"
      aria-label="Secondary actions"
    >
      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          aria-label={action.label}
          disabled={action.disabled}
          onClick={action.onPress}
          className="tf-field-footer-secondary__btn"
        >
          {action.icon && (
            <span
              className="tf-field-footer-secondary__icon"
              aria-hidden="true"
            >
              {action.icon}
            </span>
          )}
          <span className="tf-field-footer-secondary__label">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
};

FieldFooterSecondary.displayName = 'FieldFooterSecondary';

export default FieldFooterSecondary;
