import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for ControlChartViolation component.
 *
 * @public
 */
export interface ControlChartViolationProps {
  rule: string;
  index: number;
  value: number;
  timestamp?: number;
  onClick?: () => void;
  className?: string;
}

/**
 * Visual indicator for control limit violations highlighting out-of-control points.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <ControlChartViolation />
 * ```
 */
const ControlChartViolation: React.FC<ControlChartViolationProps> = ({
  rule, index, value, timestamp?, onClick?, className?
}}) => {
  return (
    <div className={`tf-control-chart-violation ${className || ''}`} onClick={onClick} role="alert">
      <span className="tf-control-chart-violation__icon">&#9888;</span>
      <span className="tf-control-chart-violation__rule">{rule}</span>
      <span className="tf-control-chart-violation__index">Sample {index + 1}</span>
      <span className="tf-control-chart-violation__value">{value.toFixed(4)}</span>
      {timestamp && <span className="tf-control-chart-violation__time">{new Date(timestamp).toLocaleTimeString()}</span>}
    </div>
  );
};

export default ControlChartViolation;
