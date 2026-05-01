import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for BoxPlotOutlier component.
 *
 * @public
 */
export interface BoxPlotOutlierProps {
  value: number;
  x: number;
  y: number;
  onClick?: () => void;
  className?: string;
}

/**
 * Outlier point displayed beyond whiskers in a box plot.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <BoxPlotOutlier />
 * ```
 */
const BoxPlotOutlier: React.FC<BoxPlotOutlierProps> = ({
  value, x, y, onClick?, className?
}}) => {
  return (
    <circle
      cx={x} cy={y} r={4}
      className={`tf-box-plot-outlier ${className || ''}`}
      onClick={onClick}
    >
      <title>Outlier: {value.toFixed(2)}</title>
    </circle>
  );
};

export default BoxPlotOutlier;
