import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for BoxPlotWhisker component.
 *
 * @public
 */
export interface BoxPlotWhiskerProps {
  min: number;
  max: number;
  x: number;
  yMin: number;
  yMax: number;
  capWidth?: number;
  className?: string;
}

/**
 * Whisker line extending from box plot showing range or confidence interval.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <BoxPlotWhisker />
 * ```
 */
const BoxPlotWhisker: React.FC<BoxPlotWhiskerProps> = ({
  min, max, x, yMin, yMax, capWidth, className
}) => {
  const cw = capWidth || 6;

  return (
    <g className={`tf-box-plot-whisker ${className || ''}`}>
      <line x1={x} y1={yMin} x2={x} y2={yMax} className="tf-box-plot-whisker__line" />
      <line x1={x - cw / 2} y1={yMin} x2={x + cw / 2} y2={yMin} className="tf-box-plot-whisker__cap" />
      <line x1={x - cw / 2} y1={yMax} x2={x + cw / 2} y2={yMax} className="tf-box-plot-whisker__cap" />
    </g>
  );
};

export default BoxPlotWhisker;
