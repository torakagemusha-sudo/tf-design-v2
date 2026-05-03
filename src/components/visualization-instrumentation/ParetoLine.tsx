import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for ParetoLine component.
 *
 * @public
 */
export interface ParetoLineProps {
  data: number[];
  maxCumulative: number;
  width: number;
  height: number;
  padding: number;
  className?: string;
}

/**
 * Cumulative percentage line overlay on a Pareto chart.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <ParetoLine />
 * ```
 */
const ParetoLine: React.FC<ParetoLineProps> = ({
  data, maxCumulative, width, height, padding, className
}) => {
  const points = data.map((v, i) => `${padding + (i / (data.length - 1)) * (width - padding * 2)},${height - padding - (v / maxCumulative) * (height - padding * 2)}`).join(' ');

  return (
    <polyline
      fill="none"
      points={points}
      className={`tf-pareto-line ${className || ''}`}
    />
  );
};

export default ParetoLine;
