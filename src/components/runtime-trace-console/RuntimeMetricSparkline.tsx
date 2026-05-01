/**
 * @fileoverview RuntimeMetricSparkline — Sparkline chart for metric history.
 * Mini line chart showing metric trend over time.
 *
 * @module @torafirma/design-system/runtime-trace-console/RuntimeMetricSparkline
 */

import React, { useMemo } from "react";
import type { BaseComponentProps, MetricPoint } from "./types";

/** Props for RuntimeMetricSparkline. */
export interface RuntimeMetricSparklineProps extends BaseComponentProps {
  /** Data points. */
  data: MetricPoint[];
  /** Width in pixels. */
  width?: number;
  /** Height in pixels. */
  height?: number;
  /** Color. */
  color?: string;
  /** Whether to fill area under line. */
  fillArea?: boolean;
}

/**
 * RuntimeMetricSparkline — Mini trend chart.
 *
 * @example
 * ```tsx
 * <RuntimeMetricSparkline
 *   data={cpuHistory}
 *   width={120}
 *   height={30}
 *   fillArea
 * />
 * ```
 */
export const RuntimeMetricSparkline: React.FC<RuntimeMetricSparklineProps> = ({
  data,
  width = 120,
  height = 30,
  color = "#06b6d4",
  fillArea = true,
  className = "",
  "data-testid": dataTestId = "runtime-metric-sparkline",
}) => {
  const points = useMemo(() => {
    if (data.length < 2) return [];
    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    return values.map((v, i) => ({
      x: (i / (values.length - 1)) * width,
      y: height - ((v - min) / range) * height,
    }));
  }, [data, width, height]);

  if (points.length < 2) return null;

  const linePoints = points.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPoints = `${points[0].x},${height} ${linePoints} ${points[points.length - 1].x},${height}`;

  return (
    <svg
      className={`tf-runtime-metric-sparkline ${className}`}
      data-testid={dataTestId}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      {fillArea && (
        <polygon
          className="tf-runtime-metric-sparkline__area"
          points={areaPoints}
          fill={color}
          fillOpacity={0.15}
        />
      )}
      <polyline
        className="tf-runtime-metric-sparkline__line"
        points={linePoints}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
      />
    </svg>
  );
};

RuntimeMetricSparkline.displayName = "RuntimeMetricSparkline";

export default RuntimeMetricSparkline;
