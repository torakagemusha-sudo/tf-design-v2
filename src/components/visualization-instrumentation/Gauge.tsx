import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { GaugeZone } from './types';

/**
 * Props for Gauge component.
 *
 * @public
 */
export interface GaugeProps {
  value: number;
  min: number;
  max: number;
  title?: string;
  unit?: string;
  zones?: GaugeZone[];
  size?: number;
  showValue?: boolean;
  className?: string;
}

/**
 * Circular gauge displaying a single value against a configurable scale with color zones.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <Gauge />
 * ```
 */
const Gauge: React.FC<GaugeProps> = ({
  value, min, max, title?, unit?, zones?, size?, showValue?, className?
}}) => {
  const radius = (size || 200) / 2 - 20;
  const center = (size || 200) / 2;
  const angleMin = -135;
  const angleMax = 135;
  const angleRange = angleMax - angleMin;
  const valueAngle = angleMin + ((value - min) / (max - min)) * angleRange;

  const polarToCartesian = (angle: number) => ({
    x: center + radius * Math.cos((angle - 90) * Math.PI / 180),
    y: center + radius * Math.sin((angle - 90) * Math.PI / 180),
  });

  return (
    <div className={`tf-gauge ${className || ''}`} style={{ width: size || 200, height: size || 200 }}>
      <svg className="tf-gauge__svg" viewBox={`0 0 ${size || 200} ${size || 200}`}>
        {zones?.map((zone, i) => {
          const startA = angleMin + ((zone.start - min) / (max - min)) * angleRange;
          const endA = angleMin + ((zone.end - min) / (max - min)) * angleRange;
          const startPt = polarToCartesian(startA);
          const endPt = polarToCartesian(endA);
          const largeArc = endA - startA > 180 ? 1 : 0;
          return (
            <path key={i} d={`M ${startPt.x} ${startPt.y} A ${radius} ${radius} 0 ${largeArc} 1 ${endPt.x} ${endPt.y}`} className="tf-gauge__zone" style={{ stroke: zone.color }} />
          );
        })}
        <circle cx={center} cy={center} r={4} className="tf-gauge__pivot" />
        <line
          x1={center} y1={center}
          x2={polarToCartesian(valueAngle).x} y2={polarToCartesian(valueAngle).y}
          className="tf-gauge__needle"
        />
      </svg>
      {showValue !== false && (
        <div className="tf-gauge__value-display">
          <span className="tf-gauge__value">{value.toFixed(1)}</span>
          {unit && <span className="tf-gauge__unit">{unit}</span>}
        </div>
      )}
      {title && <span className="tf-gauge__title">{title}</span>}
    </div>
  );
};

export default Gauge;
