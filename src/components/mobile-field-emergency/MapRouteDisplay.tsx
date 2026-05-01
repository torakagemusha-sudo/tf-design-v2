import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Single waypoint on a route.
 */
export interface RouteWaypoint {
  /** Waypoint ID. */
  id: string;
  /** Latitude. */
  lat: number;
  /** Longitude. */
  lng: number;
  /** Label. */
  label?: string;
  /** Whether the waypoint has been visited. */
  visited?: boolean;
}

/**
 * Props for MapRouteDisplay.
 */
export interface MapRouteDisplayProps {
  /** Ordered array of waypoints. */
  waypoints: RouteWaypoint[];
  /** Route name or identifier. */
  routeName?: string;
  /** Total distance string. */
  totalDistance?: string;
  /** Estimated time remaining. */
  estimatedTime?: string;
  /** Currently active waypoint index. */
  activeIndex?: number;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * MapRouteDisplay — show route on map.
 *
 * Displays a polyline route with numbered waypoint markers.
 * Visited waypoints are dimmed; the active waypoint is highlighted.
 * Summary bar shows total distance and ETA.
 */
export const MapRouteDisplay: React.FC<MapRouteDisplayProps> = ({
  waypoints,
  routeName,
  totalDistance,
  estimatedTime,
  activeIndex = 0,
  className = '',
  testId,
}) => {
  return (
    <div
      data-testid={testId}
      className={['tf-map-route-display', className].join(' ')}
    >
      {/* Route header */}
      <div className="tf-map-route-display__header">
        {routeName && (
          <h4 className="tf-map-route-display__name">{routeName}</h4>
        )}
        <div className="tf-map-route-display__meta">
          {totalDistance && (
            <span className="tf-map-route-display__distance">
              {totalDistance}
            </span>
          )}
          {estimatedTime && (
            <span className="tf-map-route-display__eta">
              ETA {estimatedTime}
            </span>
          )}
        </div>
      </div>

      {/* Waypoint strip */}
      <div className="tf-map-route-display__waypoints">
        {waypoints.map((wp, idx) => {
          const isActive = idx === activeIndex;
          const isVisited = wp.visited;
          const isPast = idx < activeIndex;

          return (
            <div
              key={wp.id}
              className={[
                'tf-map-route-display__wp',
                isActive ? 'tf-map-route-display__wp--active' : '',
                isVisited ? 'tf-map-route-display__wp--visited' : '',
                isPast ? 'tf-map-route-display__wp--past' : '',
              ].join(' ')}
            >
              {/* Connector line */}
              {idx < waypoints.length - 1 && (
                <div
                  className={[
                    'tf-map-route-display__connector',
                    isPast ? 'tf-map-route-display__connector--past' : '',
                  ].join(' ')}
                  aria-hidden="true"
                />
              )}

              {/* Waypoint marker */}
              <div
                className="tf-map-route-display__marker"
                aria-label={`Waypoint ${idx + 1}${wp.label ? `: ${wp.label}` : ''}`}
              >
                <span className="tf-map-route-display__marker-num">
                  {idx + 1}
                </span>
              </div>

              {/* Label */}
              {wp.label && (
                <span className="tf-map-route-display__wp-label">
                  {wp.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

MapRouteDisplay.displayName = 'MapRouteDisplay';

export default MapRouteDisplay;
