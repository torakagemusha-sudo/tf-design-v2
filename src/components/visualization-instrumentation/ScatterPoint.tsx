import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for ScatterPoint component.
 *
 * @public
 */
export interface ScatterPointProps {
  x: number;
  y: number;
  color?: string;
  size?: number;
  label?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Individual data point in a scatter plot with configurable size and color.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <ScatterPoint />
 * ```
 */
const ScatterPoint: React.FC<ScatterPointProps> = ({
  x, y, color?, size?, label?, onClick?, className?
}}) => {
  return (
    <circle
      cx={x} cy={y} r={size || 5}
      className={`tf-scatter-point ${className || ''}`}
      style={{ fill: color || '#0ea5e9' }}
      onClick={onClick}
    >
      {label && <title>{label}</title>}
    </circle>
  );
};

export default ScatterPoint;
