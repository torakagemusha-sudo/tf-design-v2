import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldEmptyState.
 */
export interface FieldEmptyStateProps {
  /** Title line. */
  title?: string;
  /** Description text. */
  description?: string;
  /** Icon element. */
  icon?: React.ReactNode;
  /** Primary action label. */
  actionLabel?: string;
  /** Primary action handler. */
  onAction?: () => void;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldEmptyState — empty state for mobile.
 *
 * Centred illustration + message for screens with no data.
 * Provides a primary action to help the user create/populate content.
 * Optimised for mobile viewport with generous vertical padding.
 */
export const FieldEmptyState: React.FC<FieldEmptyStateProps> = ({
  title = 'Nothing here',
  description = 'There are no items to display.',
  icon,
  actionLabel,
  onAction,
  className = '',
  testId,
}) => {
  return (
    <div
      data-testid={testId}
      className={['tf-empty-state', className].join(' ')}
      role="status"
    >
      {/* Icon */}
      {icon && (
        <div className="tf-empty-state__icon" aria-hidden="true">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="tf-empty-state__title">{title}</h3>

      {/* Description */}
      <p className="tf-empty-state__desc">{description}</p>

      {/* Action */}
      {actionLabel && onAction && (
        <button
          type="button"
          className="tf-empty-state__action"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

FieldEmptyState.displayName = 'FieldEmptyState';

export default FieldEmptyState;
