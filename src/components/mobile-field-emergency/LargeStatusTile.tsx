import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Status severity levels.
 */
export type LargeStatusSeverity =
  | 'critical'
  | 'warning'
  | 'caution'
  | 'normal'
  | 'standby'
  | 'offline';

/**
 * Props for LargeStatusTile.
 */
export interface LargeStatusTileProps {
  /** Status label — e.g. "Engine Temp". */
  label: string;
  /** Current value — e.g. "97°C". */
  value: string | number;
  /** Unit suffix — e.g. "°C", "psi", "kph". */
  unit?: string;
  /** Severity tier controlling colour. */
  severity?: LargeStatusSeverity;
  /** Icon rendered above the value. */
  icon?: React.ReactNode;
  /** Trend indicator: up / down / stable. */
  trend?: 'up' | 'down' | 'stable';
  /** Secondary detail text. */
  detail?: string;
  /** Timestamp of last reading. */
  lastUpdated?: string;
  /** Press handler for drill-down. */
  onPress?: () => void;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * LargeStatusTile — large touch-friendly status tile.
 *
 * Minimum 120 x 120 px touch target, designed for gloved-hand operation
 * and at-a-glance reading in high-vibration environments.
 * Severity colour communicates state without requiring reading the value.
 */
export const LargeStatusTile: React.FC<LargeStatusTileProps> = ({
  label,
  value,
  unit,
  severity = 'normal',
  icon,
  trend,
  detail,
  lastUpdated,
  onPress,
  className = '',
  testId,
}) => {
  const severityClass = `tf-large-status-tile--${severity}`;
  const isInteractive = !!onPress;

  const content = (
    <>
      {/* Severity glow ring */}
      <div className="tf-large-status-tile__ring" aria-hidden="true" />

      {/* Icon */}
      {icon && (
        <div className="tf-large-status-tile__icon" aria-hidden="true">
          {icon}
        </div>
      )}

      {/* Value block */}
      <div className="tf-large-status-tile__value-block">
        <span className="tf-large-status-tile__value">{value}</span>
        {unit && (
          <span className="tf-large-status-tile__unit">{unit}</span>
        )}
        {trend && (
          <span
            className={[
              'tf-large-status-tile__trend',
              `tf-large-status-tile__trend--${trend}`,
            ].join(' ')}
            aria-hidden="true"
          >
            {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '—'}
          </span>
        )}
      </div>

      {/* Label */}
      <span className="tf-large-status-tile__label">{label}</span>

      {/* Detail */}
      {detail && (
        <span className="tf-large-status-tile__detail">{detail}</span>
      )}

      {/* Last updated */}
      {lastUpdated && (
        <time className="tf-large-status-tile__updated" dateTime={lastUpdated}>
          {lastUpdated}
        </time>
      )}
    </>
  );

  return (
    <div
      data-testid={testId}
      data-severity={severity}
      className={[
        'tf-large-status-tile',
        severityClass,
        isInteractive ? 'tf-large-status-tile--interactive' : '',
        className,
      ].join(' ')}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onPress}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onPress?.();
        }
      }}
    >
      {content}
    </div>
  );
};

LargeStatusTile.displayName = 'LargeStatusTile';

export default LargeStatusTile;
