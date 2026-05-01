import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for MapGeofence.
 */
export interface MapGeofenceProps {
  /** Geofence name/label. */
  name: string;
  /** Centre coordinates. */
  center: { lat: number; lng: number };
  /** Radius in metres. */
  radiusMeters: number;
  /** Whether the geofence is currently active. */
  active?: boolean;
  /** Breach count. */
  breachCount?: number;
  /** Geofence colour. */
  color?: string;
  /** Enter handler. */
  onEnter?: () => void;
  /** Exit handler. */
  onExit?: () => void;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * MapGeofence — geofence display.
 *
 * Renders a geofence boundary circle on the map with a pulsing animation
 * when active. Shows breach count and supports enter/exit event callbacks.
 * Colour-coded for different geofence zones (patrol, restricted, safe).
 */
export const MapGeofence: React.FC<MapGeofenceProps> = ({
  name,
  center,
  radiusMeters,
  active = true,
  breachCount = 0,
  color = '#F59E0B',
  onEnter,
  onExit,
  className = '',
  testId,
}) => {
  const activeClass = active
    ? 'tf-map-geofence--active'
    : 'tf-map-geofence--inactive';
  const breachClass =
    breachCount > 0 ? 'tf-map-geofence--breached' : '';

  return (
    <div
      data-testid={testId}
      data-lat={center.lat}
      data-lng={center.lng}
      data-radius={radiusMeters}
      className={['tf-map-geofence', activeClass, breachClass, className].join(
        ' '
      )}
    >
      {/* Fence ring visual */}
      <div
        className="tf-map-geofence__ring"
        style={{ '--fence-color': color } as React.CSSProperties}
        aria-hidden="true"
      >
        {active && (
          <div className="tf-map-geofence__pulse" aria-hidden="true" />
        )}
      </div>

      {/* Info label */}
      <div className="tf-map-geofence__label">
        <span className="tf-map-geofence__name">{name}</span>
        <span className="tf-map-geofence__radius">{radiusMeters}m</span>
        {breachCount > 0 && (
          <span className="tf-map-geofence__breach-badge">
            {breachCount} breach{breachCount !== 1 ? 'es' : ''}
          </span>
        )}
      </div>

      {/* Event triggers (invisible, positioned at boundary) */}
      {onEnter && (
        <button
          type="button"
          className="tf-map-geofence__trigger tf-map-geofence__trigger--enter"
          onClick={onEnter}
          aria-label={`Enter ${name}`}
        >
          Enter
        </button>
      )}
      {onExit && (
        <button
          type="button"
          className="tf-map-geofence__trigger tf-map-geofence__trigger--exit"
          onClick={onExit}
          aria-label={`Exit ${name}`}
        >
          Exit
        </button>
      )}
    </div>
  );
};

MapGeofence.displayName = 'MapGeofence';

export default MapGeofence;
