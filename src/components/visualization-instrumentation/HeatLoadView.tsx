import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { HeatCell } from './types';

/**
 * Props for HeatLoadView component.
 *
 * @public
 */
export interface HeatLoadViewProps {
  data: HeatCell[][];
  xLabels: string[];
  yLabels: string[];
  colorScale?: string[];
  minValue: number;
  maxValue: number;
  onCellClick?: (cell: HeatCell, x: number, y: number) => void;
  className?: string;
}

/**
 * Heat map visualization for displaying intensity data across two dimensions with color gradients.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <HeatLoadView />
 * ```
 */
const HeatLoadView: React.FC<HeatLoadViewProps> = ({
  data, xLabels, yLabels, colorScale, minValue, maxValue, onCellClick, className
}) => {
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null);

  const getColor = useCallback((value: number) => {
    const ratio = (value - minValue) / (maxValue - minValue);
    const scale = colorScale || ['#0c4a6e', '#075985', '#0369a1', '#0284c7', '#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd'];
    const idx = Math.min(Math.floor(ratio * scale.length), scale.length - 1);
    return scale[idx];
  }, [minValue, maxValue, colorScale]);

  return (
    <div className={`tf-heat-load-view ${className || ''}`}>
      <div className="tf-heat-load-view__y-labels">
        {yLabels.map((label, i) => <span key={i} className="tf-heat-load-view__y-label">{label}</span>)}
      </div>
      <div className="tf-heat-load-view__grid">
        {data.map((row, y) => (
          <div key={y} className="tf-heat-load-view__row">
            {row.map((cell, x) => (
              <div
                key={x}
                className={`tf-heat-load-view__cell ${hoveredCell?.x === x && hoveredCell?.y === y ? 'tf-heat-load-view__cell--hovered' : ''}`}
                style={{ backgroundColor: getColor(cell.value) }}
                onMouseEnter={() => setHoveredCell({ x, y })}
                onMouseLeave={() => setHoveredCell(null)}
                onClick={() => onCellClick?.(cell, x, y)}
              >
                <span className="tf-heat-load-view__cell-value">{cell.value.toFixed(1)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="tf-heat-load-view__x-labels">
        {xLabels.map((label, i) => <span key={i} className="tf-heat-load-view__x-label">{label}</span>)}
      </div>
    </div>
  );
};

export default HeatLoadView;
