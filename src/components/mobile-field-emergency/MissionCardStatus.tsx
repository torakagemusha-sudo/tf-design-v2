import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for MissionCardStatus.
 */
export interface MissionCardStatusProps {
  /** Status label. */
  status: string;
  /** Colour token. */
  statusColor?: 'red' | 'amber' | 'green' | 'blue' | 'neutral';
  /** Timestamp of last status change. */
  updatedAt?: string;
  /** Optional status icon. */
  icon?: React.ReactNode;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * MissionCardStatus — mission status pill with timestamp.
 *
 * Renders a governed status pill that communicates the current mission lifecycle
 * state. Colour-coded for at-a-glance comprehension in high-stress field conditions.
 */
export const MissionCardStatus: React.FC<MissionCardStatusProps> = ({
  status,
  statusColor = 'neutral',
  updatedAt,
  icon,
  className = '',
  testId,
}) => {
  const colorClass = `tf-mission-card-status--${statusColor}`;

  return (
    <div
      data-testid={testId}
      className={['tf-mission-card-status', colorClass, className].join(' ')}
    >
      {icon && (
        <span className="tf-mission-card-status__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="tf-mission-card-status__label">{status}</span>
      {updatedAt && (
        <time
          className="tf-mission-card-status__time"
          dateTime={updatedAt}
        >
          {updatedAt}
        </time>
      )}
    </div>
  );
};

MissionCardStatus.displayName = 'MissionCardStatus';

export default MissionCardStatus;
