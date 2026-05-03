import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { SparklineItem } from './types';

/**
 * Props for SparklineStrip component.
 *
 * @public
 */
export interface SparklineStripProps {
  items: SparklineItem[];
  height?: number;
  onItemClick?: (item: SparklineItem) => void;
  className?: string;
}

/**
 * Horizontal row of sparkline charts for comparing multiple metrics at a glance.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <SparklineStrip />
 * ```
 */
const SparklineStrip: React.FC<SparklineStripProps> = ({
  items, height, onItemClick, className
}) => {
  return (
    <div className={`tf-sparkline-strip ${className || ''}`}>
      {items.map((item, i) => (
        <div key={i} className="tf-sparkline-strip__item" onClick={() => onItemClick?.(item)}>
          <span className="tf-sparkline-strip__label">{item.label}</span>
          <svg className="tf-sparkline-strip__chart" viewBox={`0 0 100 ${height || 20}`} preserveAspectRatio="none">
            <polyline
              fill="none"
              points={item.data.map((v, j) => `${(j / (item.data.length - 1)) * 100},${(height || 20) - (v / Math.max(...item.data)) * (height || 20)}`).join(' ')}
              className="tf-sparkline-strip__line"
              style={{ stroke: item.color || '#38bdf8' }}
            />
          </svg>
          <span className="tf-sparkline-strip__value">{item.currentValue.toFixed(1)}</span>
        </div>
      ))}
    </div>
  );
};

export default SparklineStrip;
