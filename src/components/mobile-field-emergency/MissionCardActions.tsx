import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Single action definition.
 */
export interface MissionAction {
  /** Action label. */
  label: string;
  /** Action handler. */
  onPress: () => void;
  /** Visual variant. */
  variant?: 'primary' | 'secondary' | 'danger' | 'governed';
  /** Icon element. */
  icon?: React.ReactNode;
  /** Disabled state. */
  disabled?: boolean;
  /** Action ID. */
  id: string;
}

/**
 * Props for MissionCardActions.
 */
export interface MissionCardActionsProps {
  /** Array of available actions. */
  actions: MissionAction[];
  /** Layout orientation. */
  orientation?: 'horizontal' | 'vertical';
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * MissionCardActions — mission actions rendered as touch-friendly buttons.
 *
 * Each action button is minimum 44 px tap target.
 * Horizontal layout scrolls on overflow; vertical layout stacks full-width.
 */
export const MissionCardActions: React.FC<MissionCardActionsProps> = ({
  actions,
  orientation = 'horizontal',
  className = '',
  testId,
}) => {
  const orientClass = `tf-mission-card-actions--${orientation}`;

  return (
    <div
      data-testid={testId}
      className={['tf-mission-card-actions', orientClass, className].join(' ')}
      role="group"
      aria-label="Mission actions"
    >
      {actions.map((action) => {
        const variantClass = action.variant
          ? `tf-mission-card-actions__btn--${action.variant}`
          : '';
        return (
          <button
            key={action.id}
            type="button"
            disabled={action.disabled}
            onClick={action.onPress}
            className={[
              'tf-mission-card-actions__btn',
              variantClass,
              action.disabled ? 'tf-mission-card-actions__btn--disabled' : '',
            ].join(' ')}
          >
            {action.icon && (
              <span
                className="tf-mission-card-actions__btn-icon"
                aria-hidden="true"
              >
                {action.icon}
              </span>
            )}
            <span className="tf-mission-card-actions__btn-label">
              {action.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

MissionCardActions.displayName = 'MissionCardActions';

export default MissionCardActions;
