import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for GaugeArc component.
 *
 * @public
 */
export interface GaugeArcProps {
  startAngle: number;
  endAngle: number;
  radius: number;
  color?: string;
  width?: number;
  className?: string;
}

/**
 * Arc segment for gauge backgrounds showing value ranges with optional color coding.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <GaugeArc />
 * ```
 */
const GaugeArc: React.FC<GaugeArcProps> = ({
  startAngle, endAngle, radius, color?, width?, className?
}}) => {
  const startRad = (startAngle - 90) * Math.PI / 180;
  const endRad = (endAngle - 90) * Math.PI / 180;
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  const x1 = 50 + radius * Math.cos(startRad);
  const y1 = 50 + radius * Math.sin(startRad);
  const x2 = 50 + radius * Math.cos(endRad);
  const y2 = 50 + radius * Math.sin(endRad);

  return (
    <path
      d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`}
      className={`tf-gauge-arc ${className || ''}`}
      style={{ stroke: color || '#334155', strokeWidth: width || 8, fill: 'none' }}
    />
  );
};

export default GaugeArc;
