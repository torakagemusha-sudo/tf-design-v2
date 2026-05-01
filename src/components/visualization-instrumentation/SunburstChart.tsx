import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { SunburstNode } from './types';

/**
 * Props for SunburstChart component.
 *
 * @public
 */
export interface SunburstChartProps {
  data: SunburstNode[];
  width?: number;
  height?: number;
  onArcClick?: (node: SunburstNode) => void;
  className?: string;
}

/**
 * Sunburst chart for visualizing hierarchical data as concentric arcs.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <SunburstChart />
 * ```
 */
const SunburstChart: React.FC<SunburstChartProps> = ({
  data, width?, height?, onArcClick?, className?
}}) => {
  const w = width || 400;
  const h = height || 400;
  const cx = w / 2;
  const cy = h / 2;

  return (
    <div className={`tf-sunburst-chart ${className || ''}`}>
      <svg className="tf-sunburst-chart__svg" viewBox={`0 0 ${w} ${h}`}>
        {data.map((node, i) => {
          const innerR = node.depth * 40 + 30;
          const outerR = innerR + 35;
          const startAngle = (node.startAngle * Math.PI) / 180;
          const endAngle = (node.endAngle * Math.PI) / 180;
          const x1 = cx + innerR * Math.cos(startAngle);
          const y1 = cy + innerR * Math.sin(startAngle);
          const x2 = cx + outerR * Math.cos(startAngle);
          const y2 = cy + outerR * Math.sin(startAngle);
          const x3 = cx + outerR * Math.cos(endAngle);
          const y3 = cy + outerR * Math.sin(endAngle);
          const x4 = cx + innerR * Math.cos(endAngle);
          const y4 = cy + innerR * Math.sin(endAngle);
          const largeArc = node.endAngle - node.startAngle > 180 ? 1 : 0;
          const d = `M ${x1} ${y1} L ${x2} ${y2} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x1} ${y1}`;
          return (
            <g key={i} className="tf-sunburst-chart__arc-group" onClick={() => onArcClick?.(node)}>
              <path d={d} className="tf-sunburst-chart__arc" style={{ fill: node.color || '#0ea5e9' }} />
              <text x={cx + (innerR + 17) * Math.cos((startAngle + endAngle) / 2)} y={cy + (innerR + 17) * Math.sin((startAngle + endAngle) / 2)} className="tf-sunburst-chart__label" textAnchor="middle" dominantBaseline="middle">{node.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default SunburstChart;
