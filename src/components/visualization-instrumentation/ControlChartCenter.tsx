import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for ControlChartCenter component.
 *
 * @public
 */
export interface ControlChartCenterProps {
  value: number;
  label?: string;
  color?: string;
  className?: string;
}

/**
 * Center line (process mean) annotation for control charts.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <ControlChartCenter />
 * ```
 */
const ControlChartCenter: React.FC<ControlChartCenterProps> = ({
  value, label?, color?, className?
}}) => {
  return (
    <div className={`tf-control-chart-center ${className || ''}`}>
      <svg className="tf-control-chart-center__svg" viewBox="0 0 800 20">
        <line x1={0} y1={10} x2={800} y2={10} className="tf-control-chart-center__line" style={{ stroke: color || '#3b82f6' }} />
        {label && <text x={10} y={8} className="tf-control-chart-center__label" style={{ fill: color || '#3b82f6' }}>{label} = {value.toFixed(3)}</text>}
      </svg>
    </div>
  );
};

export default ControlChartCenter;
