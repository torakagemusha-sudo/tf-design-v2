import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { FunnelStage } from './types';

/**
 * Props for FunnelChart component.
 *
 * @public
 */
export interface FunnelChartProps {
  stages: FunnelStage[];
  width?: number;
  height?: number;
  showPercentages?: boolean;
  showValues?: boolean;
  onStageClick?: (stage: FunnelStage) => void;
  className?: string;
}

/**
 * Funnel chart for visualizing progressive reduction through stages.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <FunnelChart />
 * ```
 */
const FunnelChart: React.FC<FunnelChartProps> = ({
  stages, width, height, showPercentages, showValues, onStageClick, className
}) => {
  const w = width || 400;
  const h = height || 500;
  const maxVal = Math.max(...stages.map((s) => s.value));

  return (
    <div className={`tf-funnel-chart ${className || ''}`}>
      <svg className="tf-funnel-chart__svg" viewBox={`0 0 ${w} ${h}`}>
        {stages.map((stage, i) => {
          const stageH = h / stages.length * 0.85;
          const y = i * (h / stages.length) + (h / stages.length - stageH) / 2;
          const topW = ((stages[Math.max(0, i - 1)]?.value || stage.value) / maxVal) * w;
          const botW = (stage.value / maxVal) * w;
          const pts = `${(w - topW) / 2},${y} ${(w + topW) / 2},${y} ${(w + botW) / 2},${y + stageH} ${(w - botW) / 2},${y + stageH}`;
          return (
            <g key={i} className="tf-funnel-chart__stage" onClick={() => onStageClick?.(stage)}>
              <polygon points={pts} className="tf-funnel-chart__bar" style={{ fill: stage.color || '#0ea5e9' }} />
              <text x={w / 2} y={y + stageH / 2} className="tf-funnel-chart__label" textAnchor="middle" dominantBaseline="middle">{stage.label}</text>
              {showValues && <text x={w / 2} y={y + stageH / 2 + 16} className="tf-funnel-chart__value" textAnchor="middle">{stage.value.toLocaleString()}</text>}
              {showPercentages && i > 0 && (
                <text x={w / 2} y={y + stageH + 12} className="tf-funnel-chart__pct" textAnchor="middle">{((stage.value / stages[0].value) * 100).toFixed(1)}%</text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default FunnelChart;
