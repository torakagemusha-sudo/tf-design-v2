import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Checkpoint data item.
 */
export interface CheckpointData {
  /** Checkpoint ID. */
  id: string;
  /** Label. */
  label: string;
  /** State. */
  state: 'upcoming' | 'current' | 'completed' | 'missed' | 'skipped';
  /** Expected time. */
  expectedAt?: string;
  /** Checked-in time. */
  checkedInAt?: string;
  /** Coordinates. */
  coordinates?: { lat: number; lng: number };
}

/**
 * Props for FieldCheckpointList.
 */
export interface FieldCheckpointListProps {
  /** Checkpoints. */
  checkpoints: CheckpointData[];
  /** Check-in handler. */
  onCheckIn?: (checkpointId: string) => void;
  /** Override handler. */
  onOverride?: (checkpointId: string) => void;
  /** Patrol title. */
  title?: string;
  /** Show progress. */
  showProgress?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldCheckpointList — checkpoint list.
 *
 * Ordered list of patrol checkpoints with progress tracking.
 * Visual timeline connector links sequential checkpoints.
 * Progress summary shows completion rate for patrol reporting.
 * Each checkpoint renders as a FieldCheckpointButton.
 */
export const FieldCheckpointList: React.FC<FieldCheckpointListProps> = ({
  checkpoints,
  onCheckIn,
  onOverride,
  title = 'Patrol Checkpoints',
  showProgress = true,
  className = '',
  testId,
}) => {
  const completed = checkpoints.filter((c) => c.state === 'completed').length;
  const total = checkpoints.length;

  return (
    <div
      data-testid={testId}
      className={['tf-checkpoint-list', className].join(' ')}
      role="list"
      aria-label={title}
    >
      {/* Title */}
      <h3 className="tf-checkpoint-list__title">{title}</h3>

      {/* Progress */}
      {showProgress && (
        <div className="tf-checkpoint-list__progress">
          <div
            className="tf-checkpoint-list__bar"
            role="progressbar"
            aria-valuenow={completed}
            aria-valuemax={total}
          >
            <div
              className="tf-checkpoint-list__fill"
              style={{ width: `${total ? (completed / total) * 100 : 0}%` }}
            />
          </div>
          <span className="tf-checkpoint-list__count">
            {completed}/{total} checked
          </span>
        </div>
      )}

      {/* Checkpoints */}
      <div className="tf-checkpoint-list__items">
        {checkpoints.map((cp, idx) => {
          const stateClass = `tf-checkpoint-list__item--${cp.state}`;
          const isLast = idx === checkpoints.length - 1;

          return (
            <div
              key={cp.id}
              className={['tf-checkpoint-list__item', stateClass].join(' ')}
              role="listitem"
            >
              {/* Timeline connector */}
              {!isLast && (
                <div className="tf-checkpoint-list__connector" aria-hidden="true" />
              )}

              {/* Marker */}
              <div className="tf-checkpoint-list__marker" aria-hidden="true">
                {cp.state === 'completed' && '✓'}
                {cp.state === 'current' && '●'}
                {cp.state === 'upcoming' && '○'}
                {cp.state === 'missed' && '!'}
                {cp.state === 'skipped' && '⊘'}
              </div>

              {/* Content */}
              <div className="tf-checkpoint-list__content">
                <span className="tf-checkpoint-list__label">{cp.label}</span>
                {cp.expectedAt && (
                  <time dateTime={cp.expectedAt}>{cp.expectedAt}</time>
                )}
                {cp.checkedInAt && (
                  <time className="tf-checkpoint-list__checked" dateTime={cp.checkedInAt}>
                    ✓ {cp.checkedInAt}
                  </time>
                )}
              </div>

              {/* Actions */}
              <div className="tf-checkpoint-list__actions">
                {cp.state === 'current' && onCheckIn && (
                  <button
                    type="button"
                    className="tf-checkpoint-list__btn tf-checkpoint-list__btn--checkin"
                    onClick={() => onCheckIn(cp.id)}
                  >
                    Check In
                  </button>
                )}
                {cp.state === 'missed' && onOverride && (
                  <button
                    type="button"
                    className="tf-checkpoint-list__btn tf-checkpoint-list__btn--override"
                    onClick={() => onOverride(cp.id)}
                  >
                    Override
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

FieldCheckpointList.displayName = 'FieldCheckpointList';

export default FieldCheckpointList;
