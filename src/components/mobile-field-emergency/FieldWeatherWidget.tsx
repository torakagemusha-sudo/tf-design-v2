import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Weather condition.
 */
export type WeatherCondition =
  | 'clear'
  | 'cloudy'
  | 'rain'
  | 'storm'
  | 'snow'
  | 'fog'
  | 'wind'
  | 'extreme';

/**
 * Props for FieldWeatherWidget.
 */
export interface FieldWeatherWidgetProps {
  /** Current temperature. */
  temperature: number;
  /** Temperature unit. */
  unit?: 'c' | 'f';
  /** Weather condition. */
  condition: WeatherCondition;
  /** Humidity percentage. */
  humidity?: number;
  /** Wind speed. */
  windSpeed?: number;
  /** Wind direction degrees. */
  windDirection?: number;
  /** Location name. */
  location?: string;
  /** Last updated timestamp. */
  updatedAt?: string;
  /** Compact mode. */
  compact?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldWeatherWidget — weather display.
 *
 * Compact weather widget with temperature, condition, humidity, and wind.
 * Condition icon maps to the current weather state.
 * Compact mode for status bar or map overlay integration.
 */
export const FieldWeatherWidget: React.FC<FieldWeatherWidgetProps> = ({
  temperature,
  unit = 'c',
  condition,
  humidity,
  windSpeed,
  windDirection,
  location,
  updatedAt,
  compact = false,
  className = '',
  testId,
}) => {
  const displayUnit = unit === 'c' ? '°C' : '°F';
  const conditionClass = `tf-weather--${condition}`;
  const compactClass = compact ? 'tf-weather--compact' : '';

  const conditionIcon: Record<WeatherCondition, string> = {
    clear: '☀',
    cloudy: '☁',
    rain: '🌧',
    storm: '⛈',
    snow: '❄',
    fog: '🌫',
    wind: '💨',
    extreme: '⚠',
  };

  return (
    <div
      data-testid={testId}
      className={['tf-weather', conditionClass, compactClass, className].join(' ')}
      role="status"
      aria-label={`Weather: ${condition}, ${Math.round(temperature)}${displayUnit}`}
    >
      {/* Condition icon */}
      <div className="tf-weather__icon" aria-hidden="true">
        {conditionIcon[condition]}
      </div>

      {/* Temperature */}
      <div className="tf-weather__temp">
        <span className="tf-weather__temp-value">
          {Math.round(temperature)}
          <span className="tf-weather__temp-unit">{displayUnit}</span>
        </span>
        {!compact && (
          <span className="tf-weather__condition">{condition}</span>
        )}
      </div>

      {/* Details */}
      {!compact && (
        <div className="tf-weather__details">
          {humidity !== undefined && (
            <span className="tf-weather__detail">
              💧 {humidity}%
            </span>
          )}
          {windSpeed !== undefined && (
            <span className="tf-weather__detail">
              💨 {windSpeed}
              {windDirection !== undefined && ` ${Math.round(windDirection)}°`}
            </span>
          )}
          {location && (
            <span className="tf-weather__location">{location}</span>
          )}
          {updatedAt && (
            <time className="tf-weather__updated" dateTime={updatedAt}>
              {updatedAt}
            </time>
          )}
        </div>
      )}
    </div>
  );
};

FieldWeatherWidget.displayName = 'FieldWeatherWidget';

export default FieldWeatherWidget;
