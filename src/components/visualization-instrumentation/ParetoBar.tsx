import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { ParetoItem } from './types';

/**
 * Props for ParetoBar component.
 *
 * @public
 */
export interface ParetoBarProps {
  value: number;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  className?: string;
}

/**
 * Individual bar in a Pareto chart sorted by descending value.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <ParetoBar />
 * ```
 */
const ParetoBar: React.FC<ParetoBarProps> = ({
  value, label, x, y, width, height, color?, className?
}}) => {
  return (
    <g className={`tf-pareto-bar ${className || ''}`}>
      <rect x={x} y={y} width={width} height={height} className="tf-pareto-bar__rect" style={{ fill: color || '#0ea5e9' }} />
      <text x={x + width / 2} y={y - 5} className="tf-pareto-bar__value" textAnchor="middle">{value.toFixed(0)}</text>
    </g>
  );
};

export default ParetoBar;
