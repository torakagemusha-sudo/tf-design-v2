import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for RadarArea component.
 *
 * @public
 */
export interface RadarAreaProps {
  values: number[];
  maxValue: number;
  radius: number;
  color?: string;
  opacity?: number;
  className?: string;
}

/**
 * Filled polygon area for a data series in a radar chart.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <RadarArea />
 * ```
 */
const RadarArea: React.FC<RadarAreaProps> = ({
  values, maxValue, radius, color, opacity, className
}) => {
  const angleStep = (2 * Math.PI) / values.length;
  const cx = 50;
  const cy = 50;
  const pts = values.map((v, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const dist = (v / maxValue) * radius;
    return `${cx + dist * Math.cos(angle)},${cy + dist * Math.sin(angle)}`;
  }).join(' ');

  return (
    <polygon
      points={pts}
      className={`tf-radar-area ${className || ''}`}
      style={{ fill: color || '#0ea5e9', opacity: opacity || 0.3, stroke: color || '#0ea5e9', strokeWidth: 1.5 }}
    />
  );
};

export default RadarArea;
