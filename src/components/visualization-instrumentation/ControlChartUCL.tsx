import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for ControlChartUCL component.
 *
 * @public
 */
export interface ControlChartUCLProps {
  value: number;
  label?: string;
  dashed?: boolean;
  color?: string;
  className?: string;
}

/**
 * Upper control limit line annotation for control charts.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <ControlChartUCL />
 * ```
 */
const ControlChartUCL: React.FC<ControlChartUCLProps> = ({
  value, label?, dashed?, color?, className?
}}) => {
  return (
    <div className={`tf-control-chart-ucl ${className || ''}`}>
      <svg className="tf-control-chart-ucl__svg" viewBox="0 0 800 20">
        <line x1={0} y1={10} x2={800} y2={10} className={`tf-control-chart-ucl__line ${dashed ? 'tf-control-chart-ucl__line--dashed' : ''}`} style={{ stroke: color || '#ef4444' }} />
        {label && <text x={10} y={8} className="tf-control-chart-ucl__label" style={{ fill: color || '#ef4444' }}>{label} = {value.toFixed(3)}</text>}
      </svg>
    </div>
  );
};

export default ControlChartUCL;
