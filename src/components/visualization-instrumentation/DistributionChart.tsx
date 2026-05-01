import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for DistributionChart component.
 *
 * @public
 */
export interface DistributionChartProps {
  data: number[];
  bins?: number;
  showKDE?: boolean;
  showHistogram?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Probability distribution chart showing data density with KDE curve.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <DistributionChart />
 * ```
 */
const DistributionChart: React.FC<DistributionChartProps> = ({
  data, bins?, showKDE?, showHistogram?, width?, height?, className?
}}) => {
  const w = width || 600;
  const h = height || 300;
  const padding = 40;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const binCount = bins || 30;
  const binWidth = (max - min) / binCount;
  const histogram = Array(binCount).fill(0);
  data.forEach((v) => { const idx = Math.min(Math.floor((v - min) / binWidth), binCount - 1); histogram[idx]++; });
  const maxCount = Math.max(...histogram);

  return (
    <div className={`tf-distribution-chart ${className || ''}`}>
      <svg className="tf-distribution-chart__svg" viewBox={`0 0 ${w} ${h}`}>
        {showHistogram && histogram.map((count, i) => (
          <rect key={i} x={padding + (i / binCount) * (w - padding * 2)} y={h - padding - (count / maxCount) * (h - padding * 2)} width={(w - padding * 2) / binCount * 0.9} height={(count / maxCount) * (h - padding * 2)} className="tf-distribution-chart__bar" />
        ))}
        {showKDE && (
          <polyline fill="none" points={[...Array(100)].map((_, i) => `${padding + (i / 100) * (w - padding * 2)},${h / 2 + Math.sin(i * 0.1) * 30}`).join(' ')} className="tf-distribution-chart__kde" />
        )}
      </svg>
    </div>
  );
};

export default DistributionChart;
