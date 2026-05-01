import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Checkpoint state.
 */
export type CheckpointState = 'upcoming' | 'current' | 'completed' | 'missed' | 'skipped';

/**
 * Props for FieldCheckpointButton.
 */
export interface FieldCheckpointButtonProps {
  /** Checkpoint name/label. */
  label: string;
  /** Checkpoint ID. */
  checkpointId: string;
  /** Current state. */
  state?: CheckpointState;
  /** Expected time. */
  expectedAt?: string;
  /** Actual check-in time. */
  checkedInAt?: string;
  /** GPS coordinates. */
  coordinates?: { lat: number; lng: number };
  /** Check-in handler. */
  onCheckIn?: (checkpointId: string) => void;
  /** Override handler. */
  onOverride?: (checkpointId: string) => void;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldCheckpointButton — checkpoint marker.
 *
 * Visual checkpoint indicator with state-based colour coding.
 * One-tap check-in for current checkpoint.
 * Override action for missed checkpoints with authority note.
 * State machine: upcoming → current → completed | missed.
 */
export const FieldCheckpointButton: React.FC<FieldCheckpointButtonProps> = ({
  label,
  checkpointId,
  state = 'upcoming',
  expectedAt,
  checkedInAt,
  coordinates,
  onCheckIn,
  onOverride,
  className = '',
  testId,
}) => {
  const stateClass = `tf-checkpoint--${state}`;

  return (
    <div
      data-testid={testId}
      data-state={state}
      className={['tf-checkpoint', stateClass, className].join(' ')}
    >
      {/* Status indicator */}
      <div className="tf-checkpoint__indicator" aria-hidden="true">
        {state === 'completed' && '✓'}
        {state === 'current' && '●'}
        {state === 'upcoming' && '○'}
        {state === 'missed' && '!'}
        {state === 'skipped' && '⊘'}
      </div>

      {/* Info */}
      <div className="tf-checkpoint__info">
        <span className="tf-checkpoint__label">{label}</span>
        {expectedAt && (
          <time className="tf-checkpoint__time" dateTime={expectedAt}>
            {expectedAt}
          </time>
        )}
        {checkedInAt && (
          <time className="tf-checkpoint__checked" dateTime={checkedInAt}>
            Checked: {checkedInAt}
          </time>
        )}
        {coordinates && (
          <span className="tf-checkpoint__coords">
            {coordinates.lat.toFixed(5)}, {coordinates.lng.toFixed(5)}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="tf-checkpoint__actions">
        {state === 'current' && onCheckIn && (
          <button
            type="button"
            className="tf-checkpoint__btn tf-checkpoint__btn--checkin"
            onClick={() => onCheckIn(checkpointId)}
          >
            Check In
          </button>
        )}
        {state === 'missed' && onOverride && (
          <button
            type="button"
            className="tf-checkpoint__btn tf-checkpoint__btn--override"
            onClick={() => onOverride(checkpointId)}
          >
            Override
          </button>
        )}
      </div>
    </div>
  );
};

FieldCheckpointButton.displayName = 'FieldCheckpointButton';

export default FieldCheckpointButton;
