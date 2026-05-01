import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Speed unit.
 */
export type SpeedUnit = 'kph' | 'mph' | 'knots' | 'ms';

/**
 * Props for FieldSpeedIndicator.
 */
export interface FieldSpeedIndicatorProps {
  /** Current speed. */
  speed: number;
  /** Speed unit. */
  unit?: SpeedUnit;
  /** Maximum speed reached. */
  maxSpeed?: number;
  /** Average speed. */
  avgSpeed?: number;
  /** Speed limit. */
  speedLimit?: number;
  /** Large tile variant. */
  large?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldSpeedIndicator — speed display.
 *
 * Large numeric speed read-out with unit display.
 * Speed limit indicator flashes when exceeded.
 * Max and average speed tracking for patrol reporting.
 * Optimised for vehicle-mounted tablet display.
 */
export const FieldSpeedIndicator: React.FC<FieldSpeedIndicatorProps> = ({
  speed,
  unit = 'kph',
  maxSpeed,
  avgSpeed,
  speedLimit,
  large = false,
  className = '',
  testId,
}) => {
  const unitLabels: Record<SpeedUnit, string> = {
    kph: 'km/h',
    mph: 'mph',
    knots: 'kn',
    ms: 'm/s',
  };

  const exceedsLimit = speedLimit !== undefined && speed > speedLimit;
  const largeClass = large ? 'tf-speed--large' : '';
  const limitClass = exceedsLimit ? 'tf-speed--exceeds' : '';

  return (
    <div
      data-testid={testId}
      className={['tf-speed', largeClass, limitClass, className].join(' ')}
      role="status"
    >
      {/* Speed value */}
      <div className="tf-speed__value-block">
        <span className="tf-speed__value">{Math.round(speed)}</span>
        <span className="tf-speed__unit">{unitLabels[unit]}</span>
      </div>

      {/* Speed limit warning */}
      {speedLimit !== undefined && (
        <div className="tf-speed__limit">
          <span className="tf-speed__limit-label">Limit</span>
          <span className="tf-speed__limit-value">
            {Math.round(speedLimit)} {unitLabels[unit]}
          </span>
          {exceedsLimit && (
            <span className="tf-speed__limit-warning" role="alert">
              ⚠ OVER
            </span>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="tf-speed__stats">
        {maxSpeed !== undefined && (
          <span className="tf-speed__stat">
            Max: {Math.round(maxSpeed)}
          </span>
        )}
        {avgSpeed !== undefined && (
          <span className="tf-speed__stat">
            Avg: {Math.round(avgSpeed)}
          </span>
        )}
      </div>
    </div>
  );
};

FieldSpeedIndicator.displayName = 'FieldSpeedIndicator';

export default FieldSpeedIndicator;
