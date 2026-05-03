import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for GaugeNeedle component.
 *
 * @public
 */
export interface GaugeNeedleProps {
  angle: number;
  length: number;
  color?: string;
  width?: number;
  pivotSize?: number;
  className?: string;
}

/**
 * Animated needle indicator for circular gauges with configurable length and color.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <GaugeNeedle />
 * ```
 */
const GaugeNeedle: React.FC<GaugeNeedleProps> = ({
  angle, length, color, width, pivotSize, className
}) => {
  const radians = (angle - 90) * Math.PI / 180;
  const x2 = 50 + (length || 40) * Math.cos(radians);
  const y2 = 50 + (length || 40) * Math.sin(radians);

  return (
    <g className={`tf-gauge-needle ${className || ''}`}>
      <line x1={50} y1={50} x2={x2} y2={y2} className="tf-gauge-needle__shaft" style={{ stroke: color || '#e2e8f0', strokeWidth: width || 2 }} />
      <circle cx={50} cy={50} r={pivotSize || 4} className="tf-gauge-needle__pivot" style={{ fill: color || '#e2e8f0' }} />
    </g>
  );
};

export default GaugeNeedle;
