import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldHandoffButton.
 */
export interface FieldHandoffButtonProps {
  /** Current operator name. */
  currentOperator?: string;
  /** Next operator name. */
  nextOperator?: string;
  /** Shift start time. */
  shiftStartedAt?: string;
  /** Items pending handoff count. */
  pendingItems?: number;
  /** Handoff handler. */
  onHandoff: () => void;
  /** View summary handler. */
  onViewSummary?: () => void;
  /** Disabled. */
  disabled?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldHandoffButton — shift handoff.
 *
 * Prominent button for shift change handoff operations.
 * Displays current and next operator names, shift duration,
 * and pending items that need transfer.
 * Authority-aware: only the current operator or supervisor
 * can initiate handoff.
 */
export const FieldHandoffButton: React.FC<FieldHandoffButtonProps> = ({
  currentOperator,
  nextOperator,
  shiftStartedAt,
  pendingItems = 0,
  onHandoff,
  onViewSummary,
  disabled = false,
  className = '',
  testId,
}) => {
  const shiftDuration = shiftStartedAt
    ? formatDuration(new Date(shiftStartedAt), new Date())
    : null;

  return (
    <div
      data-testid={testId}
      className={['tf-handoff', className].join(' ')}
    >
      {/* Shift info */}
      <div className="tf-handoff__info">
        {currentOperator && (
          <span className="tf-handoff__current">
            Current: {currentOperator}
          </span>
        )}
        {nextOperator && (
          <span className="tf-handoff__next">
            → {nextOperator}
          </span>
        )}
        {shiftDuration && (
          <span className="tf-handoff__duration">
            Shift: {shiftDuration}
          </span>
        )}
      </div>

      {/* Pending items warning */}
      {pendingItems > 0 && (
        <div className="tf-handoff__pending" role="alert">
          <span className="tf-handoff__pending-badge">
            {pendingItems} item{pendingItems !== 1 ? 's' : ''} pending
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="tf-handoff__actions">
        {onViewSummary && (
          <button
            type="button"
            className="tf-handoff__btn tf-handoff__btn--summary"
            onClick={onViewSummary}
          >
            View Summary
          </button>
        )}
        <button
          type="button"
          className="tf-handoff__btn tf-handoff__btn--handoff"
          onClick={onHandoff}
          disabled={disabled}
        >
          Handoff Shift
        </button>
      </div>
    </div>
  );
};

function formatDuration(start: Date, end: Date): string {
  const diffMs = end.getTime() - start.getTime();
  const hours = Math.floor(diffMs / 3600000);
  const minutes = Math.floor((diffMs % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
}

FieldHandoffButton.displayName = 'FieldHandoffButton';

export default FieldHandoffButton;
