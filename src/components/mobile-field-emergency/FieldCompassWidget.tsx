import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldCompassWidget.
 */
export interface FieldCompassWidgetProps {
  /** Heading in degrees (0-360). */
  heading: number;
  /** Cardinal direction label. */
  cardinal?: string;
  /** Target bearing to navigate toward. */
  targetBearing?: number;
  /** Whether compass is from device sensor. */
  fromSensor?: boolean;
  /** Large variant. */
  large?: boolean;
  /** Show numeric heading. */
  showNumeric?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldCompassWidget — compass display.
 *
 * Visual compass rose with needle pointing to magnetic north.
 * Target bearing overlay shows deviation from desired heading.
 * Sensor integration for real-time device orientation.
 * Smooth rotation animation for needle movement.
 */
export const FieldCompassWidget: React.FC<FieldCompassWidgetProps> = ({
  heading,
  cardinal,
  targetBearing,
  fromSensor = false,
  large = false,
  showNumeric = true,
  className = '',
  testId,
}) => {
  const cardinalDir = cardinal || getCardinal(heading);
  const largeClass = large ? 'tf-compass--large' : '';
  const sensorClass = fromSensor ? 'tf-compass--sensor' : '';

  // Calculate needle rotation (rotate the needle to point north)
  const needleRotation = -heading;

  // Calculate target deviation
  const targetDeviation = targetBearing !== undefined
    ? normalizeAngle(targetBearing - heading)
    : undefined;

  return (
    <div
      data-testid={testId}
      className={['tf-compass', largeClass, sensorClass, className].join(' ')}
      role="img"
      aria-label={`Compass heading ${Math.round(heading)} degrees ${cardinalDir}`}
    >
      {/* Compass rose */}
      <div className="tf-compass__rose" aria-hidden="true">
        {/* Cardinal markers */}
        <span className="tf-compass__cardinal tf-compass__cardinal--n">N</span>
        <span className="tf-compass__cardinal tf-compass__cardinal--e">E</span>
        <span className="tf-compass__cardinal tf-compass__cardinal--s">S</span>
        <span className="tf-compass__cardinal tf-compass__cardinal--w">W</span>

        {/* Rotating needle */}
        <div
          className="tf-compass__needle"
          style={{ transform: `rotate(${needleRotation}deg)` }}
        >
          <div className="tf-compass__needle-north" />
          <div className="tf-compass__needle-south" />
        </div>

        {/* Target bearing indicator */}
        {targetDeviation !== undefined && (
          <div
            className="tf-compass__target"
            style={{ transform: `rotate(${targetDeviation}deg)` }}
          >
            <div className="tf-compass__target-marker" />
          </div>
        )}
      </div>

      {/* Numeric display */}
      {showNumeric && (
        <div className="tf-compass__numeric">
          <span className="tf-compass__heading">{Math.round(heading)}°</span>
          <span className="tf-compass__dir">{cardinalDir}</span>
        </div>
      )}

      {/* Target info */}
      {targetBearing !== undefined && (
        <div className="tf-compass__target-info">
          Target: {Math.round(targetBearing)}°
          {targetDeviation !== undefined && (
            <span className="tf-compass__deviation">
              ({targetDeviation >= 0 ? '+' : ''}{Math.round(targetDeviation)}°)
            </span>
          )}
        </div>
      )}

      {/* Sensor indicator */}
      {fromSensor && (
        <span className="tf-compass__sensor-badge">SENSOR</span>
      )}
    </div>
  );
};

function getCardinal(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8];
}

function normalizeAngle(deg: number): number {
  deg = deg % 360;
  if (deg > 180) deg -= 360;
  if (deg < -180) deg += 360;
  return deg;
}

FieldCompassWidget.displayName = 'FieldCompassWidget';

export default FieldCompassWidget;
