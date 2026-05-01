import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for LargeStatusTileIcon.
 */
export interface LargeStatusTileIconProps {
  /** Icon element to render. */
  icon: React.ReactNode;
  /** Severity colour override. */
  severity?: 'critical' | 'warning' | 'caution' | 'normal' | 'standby' | 'offline';
  /** Pulse animation for active alerts. */
  pulsing?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * LargeStatusTileIcon — status icon rendered inside a LargeStatusTile.
 *
 * Supports pulsing animation for active alert states.
 * Size is optimised for the 120 px tile format.
 */
export const LargeStatusTileIcon: React.FC<LargeStatusTileIconProps> = ({
  icon,
  severity = 'normal',
  pulsing = false,
  className = '',
  testId,
}) => {
  const severityClass = `tf-large-status-tile-icon--${severity}`;
  const pulseClass = pulsing ? 'tf-large-status-tile-icon--pulse' : '';

  return (
    <div
      data-testid={testId}
      className={[
        'tf-large-status-tile-icon',
        severityClass,
        pulseClass,
        className,
      ].join(' ')}
      aria-hidden="true"
    >
      {icon}
    </div>
  );
};

LargeStatusTileIcon.displayName = 'LargeStatusTileIcon';

export default LargeStatusTileIcon;
