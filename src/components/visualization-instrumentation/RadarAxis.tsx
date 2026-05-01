import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for RadarAxis component.
 *
 * @public
 */
export interface RadarAxisProps {
  label: string;
  angle: number;
  radius: number;
  cx?: number;
  cy?: number;
  className?: string;
}

/**
 * Individual axis line and label for radar charts.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <RadarAxis />
 * ```
 */
const RadarAxis: React.FC<RadarAxisProps> = ({
  label, angle, radius, cx?, cy?, className?
}}) => {
  const rad = (angle * Math.PI) / 180;
  const x2 = (cx || 50) + radius * Math.cos(rad);
  const y2 = (cy || 50) + radius * Math.sin(rad);

  return (
    <g className={`tf-radar-axis ${className || ''}`}>
      <line x1={cx || 50} y1={cy || 50} x2={x2} y2={y2} className="tf-radar-axis__line" />
      <text x={x2 + 8 * Math.cos(rad)} y={y2 + 8 * Math.sin(rad)} className="tf-radar-axis__label" textAnchor="middle" dominantBaseline="middle">{label}</text>
    </g>
  );
};

export default RadarAxis;
