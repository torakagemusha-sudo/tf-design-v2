import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { WesternElectricRule } from './types';

/**
 * Props for ControlChart component.
 *
 * @public
 */
export interface ControlChartProps {
  data: number[];
  ucl: number;
  lcl: number;
  center: number;
  sampleSize?: number;
  rules?: WesternElectricRule[];
  onViolation?: (rule: string, index: number) => void;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Statistical process control chart for monitoring process stability with control limits and rule detection.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <ControlChart />
 * ```
 */
const ControlChart: React.FC<ControlChartProps> = ({
  data, ucl, lcl, center, sampleSize, rules, onViolation, width, height, className
}) => {
  const [violations, setViolations] = useState<Array<{ rule: string; index: number }>>([]);

  useEffect(() => {
    const detected: Array<{ rule: string; index: number }> = [];
    // Rule 1: Any point beyond UCL/LCL
    data.forEach((v, i) => {
      if (v > ucl || v < lcl) detected.push({ rule: 'Rule 1 - Beyond Limits', index: i });
    });
    setViolations(detected);
    detected.forEach((v) => onViolation?.(v.rule, v.index));
  }, [data, ucl, lcl, onViolation]);

  const spacing = (width || 800) / data.length;

  return (
    <div className={`tf-control-chart ${className || ''}`}>
      <svg className="tf-control-chart__svg" viewBox={`0 0 ${width || 800} ${height || 400}`}>
        <rect x={0} y={0} width={width || 800} height={(height || 400) * ((ucl - lcl) / (ucl - lcl + 2))} className="tf-control-chart__zone-c" />
        <line x1={0} y1={(height || 400) * ((ucl - center) / (ucl - lcl + 2))} x2={width || 800} y2={(height || 400) * ((ucl - center) / (ucl - lcl + 2))} className="tf-control-chart__ucl-line" />
        <line x1={0} y1={(height || 400) / 2} x2={width || 800} y2={(height || 400) / 2} className="tf-control-chart__center-line" />
        <line x1={0} y1={(height || 400) * (1 - (center - lcl) / (ucl - lcl + 2))} x2={width || 800} y2={(height || 400) * (1 - (center - lcl) / (ucl - lcl + 2))} className="tf-control-chart__lcl-line" />
        <path d={data.map((v, i) => `${i === 0 ? 'M' : 'L'}${i * spacing},${(height || 400) * (1 - (v - lcl + 1) / (ucl - lcl + 2))}`).join(' ')} className="tf-control-chart__data-line" />
        {data.map((v, i) => (
          <circle key={i} cx={i * spacing} cy={(height || 400) * (1 - (v - lcl + 1) / (ucl - lcl + 2))} r={violations.some((vi) => vi.index === i) ? 6 : 3} className={`tf-control-chart__point ${violations.some((vi) => vi.index === i) ? 'tf-control-chart__point--violation' : ''}`} />
        ))}
      </svg>
    </div>
  );
};

export default ControlChart;
