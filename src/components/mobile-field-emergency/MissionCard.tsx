import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Mission priority level.
 */
export type MissionPriority = 'critical' | 'high' | 'medium' | 'low' | 'routine';

/**
 * Mission status in the lifecycle.
 */
export type MissionStatus =
  | 'draft'
  | 'assigned'
  | 'in-progress'
  | 'on-hold'
  | 'completed'
  | 'aborted'
  | 'overdue';

/**
 * Props for MissionCard.
 */
export interface MissionCardProps {
  /** Unique mission identifier. */
  missionId: string;
  /** Mission title. */
  title: string;
  /** Brief description. */
  description?: string;
  /** Priority level. */
  priority?: MissionPriority;
  /** Current status. */
  status?: MissionStatus;
  /** Assignee name or ID. */
  assignee?: string;
  /** Due date/time ISO string. */
  dueAt?: string;
  /** Composed child sections (header, objectives, status, actions). */
  children?: React.ReactNode;
  /** Press to navigate to mission detail. */
  onPress?: (missionId: string) => void;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * MissionCard — mission/task card for field operatives.
 *
 * Displays mission context (priority, status, assignee, due date) in a
 * swipe-friendly card format. Composes with MissionCardHeader,
 * MissionCardObjective, MissionCardStatus, and MissionCardActions.
 */
export const MissionCard: React.FC<MissionCardProps> = ({
  missionId,
  title,
  description,
  priority = 'medium',
  status = 'assigned',
  assignee,
  dueAt,
  children,
  onPress,
  className = '',
  testId,
}) => {
  const priorityClass = `tf-mission-card--priority-${priority}`;
  const statusClass = `tf-mission-card--status-${status}`;

  return (
    <article
      data-testid={testId}
      data-mission-id={missionId}
      data-priority={priority}
      data-status={status}
      className={[
        'tf-mission-card',
        priorityClass,
        statusClass,
        className,
      ].join(' ')}
      onClick={() => onPress?.(missionId)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPress?.(missionId);
        }
      }}
    >
      {/* Priority indicator stripe */}
      <div className="tf-mission-card__stripe" aria-hidden="true" />

      {/* Main content — composed or default */}
      <div className="tf-mission-card__content">
        {children || (
          <>
            <div className="tf-mission-card__header">
              <h3 className="tf-mission-card__title">{title}</h3>
              <span className="tf-mission-card__badge">{priority}</span>
            </div>
            {description && (
              <p className="tf-mission-card__desc">{description}</p>
            )}
            <div className="tf-mission-card__meta">
              {assignee && (
                <span className="tf-mission-card__assignee">{assignee}</span>
              )}
              {dueAt && (
                <time className="tf-mission-card__due" dateTime={dueAt}>
                  {dueAt}
                </time>
              )}
            </div>
          </>
        )}
      </div>
    </article>
  );
};

MissionCard.displayName = 'MissionCard';

export default MissionCard;
