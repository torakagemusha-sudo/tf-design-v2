import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldTemperatureDisplay.
 */
export interface FieldTemperatureDisplayProps {
  /** Temperature value. */
  temperature: number;
  /** Unit: celsius or fahrenheit. */
  unit?: 'c' | 'f';
  /** Feels-like temperature. */
  feelsLike?: number;
  /** Source label. */
  source?: string;
  /** Trend direction. */
  trend?: 'rising' | 'falling' | 'stable';
  /** Whether the reading is from a device sensor. */
  fromSensor?: boolean;
  /** Large tile variant. */
  large?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldTemperatureDisplay — ambient temperature.
 *
 * Displays temperature with unit toggle and feels-like reading.
 * Device sensor integration flag for phone-based temperature readings.
 * Trend arrow indicates whether temperature is rising or falling.
 */
export const FieldTemperatureDisplay: React.FC<FieldTemperatureDisplayProps> = ({
  temperature,
  unit = 'c',
  feelsLike,
  source,
  trend,
  fromSensor = false,
  large = false,
  className = '',
  testId,
}) => {
  const displayUnit = unit === 'c' ? '°C' : '°F';
  const trendIcon = {
    rising: '↑',
    falling: '↓',
    stable: '→',
  }[trend || 'stable'];

  const largeClass = large ? 'tf-temp--large' : '';
  const sensorClass = fromSensor ? 'tf-temp--sensor' : '';

  return (
    <div
      data-testid={testId}
      className={['tf-temp', largeClass, sensorClass, className].join(' ')}
      role="status"
    >
      {/* Thermometer icon */}
      <div className="tf-temp__icon" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
        </svg>
      </div>

      {/* Temperature value */}
      <div className="tf-temp__value-block">
        <span className="tf-temp__value">
          {Math.round(temperature)}
          <span className="tf-temp__unit">{displayUnit}</span>
        </span>
        {trend && (
          <span className="tf-temp__trend" aria-label={`Temperature ${trend}`}>
            {trendIcon}
          </span>
        )}
      </div>

      {/* Feels like */}
      {feelsLike !== undefined && (
        <span className="tf-temp__feels">
          Feels like {Math.round(feelsLike)}{displayUnit}
        </span>
      )}

      {/* Source */}
      {source && (
        <span className="tf-temp__source">
          {fromSensor && 'Sensor: '}{source}
        </span>
      )}
    </div>
  );
};

FieldTemperatureDisplay.displayName = 'FieldTemperatureDisplay';

export default FieldTemperatureDisplay;
