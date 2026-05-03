import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for PieChartLabel component.
 *
 * @public
 */
export interface PieChartLabelProps {
  angle: number;
  radius: number;
  text: string;
  percent?: boolean;
  value?: number;
  className?: string;
}

/**
 * Label positioned on or near a pie slice showing percentage or value.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <PieChartLabel />
 * ```
 */
const PieChartLabel: React.FC<PieChartLabelProps> = ({
  angle, radius, text, percent, value, className
}) => {
  const rad = (angle * Math.PI) / 180;
  const x = 50 + radius * Math.cos(rad);
  const y = 50 + radius * Math.sin(rad);

  return (
    <text x={x} y={y} className={`tf-pie-chart-label ${className || ''}`} textAnchor="middle" dominantBaseline="middle">
      {percent && value !== undefined ? `${text} (${((value) * 100).toFixed(1)}%)` : text}
    </text>
  );
};

export default PieChartLabel;
