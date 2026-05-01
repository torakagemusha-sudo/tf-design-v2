import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Route checkpoint.
 */
export interface PatrolCheckpoint {
  /** Checkpoint ID. */
  id: string;
  /** Name. */
  name: string;
  /** Latitude. */
  lat: number;
  /** Longitude. */
  lng: number;
  /** Checked state. */
  checked?: boolean;
  /** Checked at. */
  checkedAt?: string;
}

/**
 * Props for FieldPatrolRoute.
 */
export interface FieldPatrolRouteProps {
  /** Route name. */
  name: string;
  /** Ordered checkpoints. */
  checkpoints: PatrolCheckpoint[];
  /** Current position index. */
  currentIndex?: number;
  /** Total route distance. */
  totalDistance?: string;
  /** Estimated time. */
  estimatedTime?: string;
  /** Map placeholder or element. */
  mapElement?: React.ReactNode;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldPatrolRoute — patrol route display.
 *
 * Visual patrol route with checkpoint timeline and optional map.
 * Current position highlighted with pulsing indicator.
 * Route statistics (distance, ETA) in the header.
 * Timeline view for checkpoint navigation overview.
 */
export const FieldPatrolRoute: React.FC<FieldPatrolRouteProps> = ({
  name,
  checkpoints,
  currentIndex = 0,
  totalDistance,
  estimatedTime,
  mapElement,
  className = '',
  testId,
}) => {
  const completed = checkpoints.filter((c) => c.checked).length;

  return (
    <div
      data-testid={testId}
      className={['tf-patrol-route', className].join(' ')}
    >
      {/* Header */}
      <div className="tf-patrol-route__header">
        <h3 className="tf-patrol-route__name">{name}</h3>
        <div className="tf-patrol-route__meta">
          {totalDistance && (
            <span className="tf-patrol-route__distance">{totalDistance}</span>
          )}
          {estimatedTime && (
            <span className="tf-patrol-route__eta">ETA {estimatedTime}</span>
          )}
          <span className="tf-patrol-route__progress">
            {completed}/{checkpoints.length}
          </span>
        </div>
      </div>

      {/* Map area */}
      {mapElement && (
        <div className="tf-patrol-route__map">{mapElement}</div>
      )}

      {/* Checkpoint timeline */}
      <div className="tf-patrol-route__timeline">
        {checkpoints.map((cp, idx) => {
          const isCurrent = idx === currentIndex;
          const isPast = idx < currentIndex;
          const isUpcoming = idx > currentIndex;

          return (
            <div
              key={cp.id}
              className={[
                'tf-patrol-route__cp',
                isCurrent ? 'tf-patrol-route__cp--current' : '',
                isPast ? 'tf-patrol-route__cp--past' : '',
                cp.checked ? 'tf-patrol-route__cp--checked' : '',
              ].join(' ')}
            >
              {/* Connector */}
              {idx < checkpoints.length - 1 && (
                <div
                  className={[
                    'tf-patrol-route__connector',
                    isPast ? 'tf-patrol-route__connector--past' : '',
                  ].join(' ')}
                  aria-hidden="true"
                />
              )}

              {/* Dot */}
              <div className="tf-patrol-route__dot" aria-hidden="true">
                {cp.checked ? '✓' : isCurrent ? '●' : '○'}
              </div>

              {/* Info */}
              <div className="tf-patrol-route__info">
                <span className="tf-patrol-route__cp-name">{cp.name}</span>
                {cp.checkedAt && (
                  <time dateTime={cp.checkedAt}>{cp.checkedAt}</time>
                )}
                <span className="tf-patrol-route__coords">
                  {cp.lat.toFixed(5)}, {cp.lng.toFixed(5)}
                </span>
              </div>

              {/* Current indicator */}
              {isCurrent && (
                <span className="tf-patrol-route__current-badge">
                  CURRENT
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

FieldPatrolRoute.displayName = 'FieldPatrolRoute';

export default FieldPatrolRoute;
