import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * GPS fix quality levels.
 */
export type GPSFixQuality = 'none' | '2d' | '3d' | 'dgps' | 'rtk';

/**
 * Props for FieldGPSIndicator.
 */
export interface FieldGPSIndicatorProps {
  /** Whether GPS is enabled. */
  enabled: boolean;
  /** Current fix quality. */
  fixQuality?: GPSFixQuality;
  /** Number of satellites in view. */
  satellites?: number;
  /** Horizontal accuracy in metres. */
  accuracyMeters?: number;
  /** Current latitude. */
  latitude?: number;
  /** Current longitude. */
  longitude?: number;
  /** Altitude in metres. */
  altitude?: number;
  /** Compact mode (icon only). */
  compact?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldGPSIndicator — GPS status.
 *
 * Displays GPS fix quality, satellite count, and position accuracy.
 * Compact mode shows only the satellite icon with colour-coded fix state.
 * Full mode expands to show coordinates and accuracy for diagnostics.
 * Pulsing animation indicates an active GPS search.
 */
export const FieldGPSIndicator: React.FC<FieldGPSIndicatorProps> = ({
  enabled,
  fixQuality = 'none',
  satellites = 0,
  accuracyMeters,
  latitude,
  longitude,
  altitude,
  compact = false,
  className = '',
  testId,
}) => {
  const fixClass = `tf-gps-indicator--fix-${fixQuality}`;
  const searchingClass = enabled && fixQuality === 'none'
    ? 'tf-gps-indicator--searching'
    : '';

  return (
    <div
      data-testid={testId}
      className={[
        'tf-gps-indicator',
        fixClass,
        searchingClass,
        compact ? 'tf-gps-indicator--compact' : '',
        className,
      ].join(' ')}
      role="status"
      aria-label={`GPS ${enabled ? fixQuality : 'off'}, ${satellites} satellites`}
    >
      {/* Satellite icon */}
      <div className="tf-gps-indicator__icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        {/* Pulse ring when searching */}
        {searchingClass && (
          <span className="tf-gps-indicator__pulse" aria-hidden="true" />
        )}
      </div>

      {/* Full info */}
      {!compact && (
        <div className="tf-gps-indicator__info">
          <span className="tf-gps-indicator__fix">
            {fixQuality === 'none' && !enabled && 'GPS Off'}
            {fixQuality === 'none' && enabled && 'Searching...'}
            {fixQuality === '2d' && '2D Fix'}
            {fixQuality === '3d' && '3D Fix'}
            {fixQuality === 'dgps' && 'DGPS'}
            {fixQuality === 'rtk' && 'RTK'}
          </span>
          {satellites > 0 && (
            <span className="tf-gps-indicator__sats">
              {satellites} SVs
            </span>
          )}
          {accuracyMeters !== undefined && (
            <span className="tf-gps-indicator__accuracy">
              ±{accuracyMeters.toFixed(1)}m
            </span>
          )}
          {(latitude !== undefined && longitude !== undefined) && (
            <span className="tf-gps-indicator__coords">
              {latitude.toFixed(5)}, {longitude.toFixed(5)}
              {altitude !== undefined && ` @ ${altitude.toFixed(0)}m`}
            </span>
          )}
        </div>
      )}

      {/* Compact badge */}
      {compact && satellites > 0 && (
        <span className="tf-gps-indicator__badge">{satellites}</span>
      )}
    </div>
  );
};

FieldGPSIndicator.displayName = 'FieldGPSIndicator';

export default FieldGPSIndicator;
