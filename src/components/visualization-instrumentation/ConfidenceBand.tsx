import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for ConfidenceBand component.
 *
 * @public
 */
export interface ConfidenceBandProps {
  upper: number[];
  lower: number[];
  xValues: number[];
  width: number;
  height: number;
  padding: number;
  color?: string;
  opacity?: number;
  className?: string;
}

/**
 * Shaded confidence interval band around a forecast or estimate line.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <ConfidenceBand />
 * ```
 */
const ConfidenceBand: React.FC<ConfidenceBandProps> = ({
  upper, lower, xValues, width, height, padding, color, opacity, className
}) => {
  const points = [...upper.map((u, i) => `${padding + (xValues[i] / Math.max(...xValues)) * (width - padding * 2)},${height / 2 - (u / 100) * (height / 2)}`), ...lower.map((l, i) => `${padding + (xValues[xValues.length - 1 - i] / Math.max(...xValues)) * (width - padding * 2)},${height / 2 - (lower[lower.length - 1 - i] / 100) * (height / 2)}`)].join(' ');

  return (
    <polygon
      points={points}
      className={`tf-confidence-band ${className || ''}`}
      style={{ fill: color || '#0ea5e9', opacity: opacity || 0.15 }}
    />
  );
};

export default ConfidenceBand;
