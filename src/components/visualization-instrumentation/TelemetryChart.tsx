import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import type { TelemetrySeries, TimeRange, DataPoint } from './types';

/**
 * Props for TelemetryChart component.
 *
 * @public
 */
export interface TelemetryChartProps {
  series: TelemetrySeries[];
  timeRange: TimeRange;
  yAxisLabel?: string;
  xAxisLabel?: string;
  gridLines?: boolean;
  crosshair?: boolean;
  onHover?: (point: DataPoint) => void;
  onClick?: (point: DataPoint) => void;
  className?: string;
}

/**
 * Time-series telemetry chart for displaying sensor data over time with configurable axes, grids, and series rendering.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <TelemetryChart />
 * ```
 */
const TelemetryChart: React.FC<TelemetryChartProps> = ({
  series, timeRange, yAxisLabel, xAxisLabel, gridLines, crosshair, onHover, onClick, className
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || !onHover) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Find nearest data point logic would go here
    onHover({ x, y, timestamp: Date.now(), value: 0 });
  }, [onHover]);

  return (
    <div className={`tf-telemetry-chart ${className || ''}`}>
      <svg
        ref={svgRef}
        className="tf-telemetry-chart__svg"
        viewBox="0 0 800 400"
        onMouseMove={handleMouseMove}
        onClick={(e) => onClick?.({ x: e.clientX, y: e.clientY, timestamp: Date.now(), value: 0 })}
      >
        {gridLines !== false && (
          <g className="tf-telemetry-chart__grid">
            {[...Array(10)].map((_, i) => (
              <line key={i} x1={0} y1={i * 40} x2={800} y2={i * 40} className="tf-telemetry-chart__grid-line" />
            ))}
          </g>
        )}
        {series.map((s, idx) => (
          <g key={idx} className={`tf-telemetry-chart__series tf-telemetry-chart__series--${s.id}`}>
            <path d={s.data.map((d, i) => `${i === 0 ? 'M' : 'L'}${(i / (s.data.length - 1)) * 800},${400 - (d.value / s.maxValue) * 400}`).join(' ')} className="tf-telemetry-chart__line" style={{ stroke: s.color }} />
          </g>
        ))}
        {hoveredPoint && (
          <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r={4} className="tf-telemetry-chart__hover-point" />
        )}
      </svg>
    </div>
  );
};

export default TelemetryChart;
