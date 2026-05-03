import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { DataPoint } from './types';

/**
 * Props for TelemetryChartBrush component.
 *
 * @public
 */
export interface TelemetryChartBrushProps {
  domain: [number, number];
  range: [number, number];
  onChange: (range: [number, number]) => void;
  height?: number;
  className?: string;
}

/**
 * Range brush selector for zooming into specific time ranges on telemetry charts.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <TelemetryChartBrush />
 * ```
 */
const TelemetryChartBrush: React.FC<TelemetryChartBrushProps> = ({
  domain, range, onChange, height, className
}) => {
  const [start, end] = range;
  const [isDragging, setIsDragging] = useState(false);
  const [dragTarget, setDragTarget] = useState<'start' | 'end' | 'range' | null>(null);

  const domainSpan = domain[1] - domain[0];
  const startPct = (start - domain[0]) / domainSpan;
  const endPct = (end - domain[0]) / domainSpan;

  const handleMouseDown = useCallback((target: 'start' | 'end' | 'range') => {
    setIsDragging(true);
    setDragTarget(target);
  }, []);

  return (
    <div className={`tf-telemetry-chart-brush ${className || ''}`} style={{ height: height || 60 }}>
      <svg className="tf-telemetry-chart-brush__svg" viewBox="0 0 800 60">
        <rect x={0} y={0} width={800} height={60} className="tf-telemetry-chart-brush__bg" />
        <rect x={startPct * 800} y={0} width={(endPct - startPct) * 800} height={60} className="tf-telemetry-chart-brush__selection" />
        <rect x={startPct * 800 - 4} y={0} width={8} height={60} className="tf-telemetry-chart-brush__handle tf-telemetry-chart-brush__handle--start" onMouseDown={() => handleMouseDown('start')} />
        <rect x={endPct * 800 - 4} y={0} width={8} height={60} className="tf-telemetry-chart-brush__handle tf-telemetry-chart-brush__handle--end" onMouseDown={() => handleMouseDown('end')} />
      </svg>
    </div>
  );
};

export default TelemetryChartBrush;
