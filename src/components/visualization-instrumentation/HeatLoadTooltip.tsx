import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { HeatCell } from './types';

/**
 * Props for HeatLoadTooltip component.
 *
 * @public
 */
export interface HeatLoadTooltipProps {
  cell: HeatCell | null;
  xLabel?: string;
  yLabel?: string;
  visible: boolean;
  x: number;
  y: number;
  formatter?: (value: number) => string;
  className?: string;
}

/**
 * Tooltip for heat map cells displaying detailed cell information and context.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <HeatLoadTooltip />
 * ```
 */
const HeatLoadTooltip: React.FC<HeatLoadTooltipProps> = ({
  cell, xLabel, yLabel, visible, x, y, formatter, className
}) => {
  if (!visible || !cell) return null;

  return (
    <div className={`tf-heat-load-tooltip ${className || ''}`} style={{ left: x, top: y }}>
      <div className="tf-heat-load-tooltip__header">
        {xLabel && <span className="tf-heat-load-tooltip__x">{xLabel}</span>}
        {yLabel && <span className="tf-heat-load-tooltip__y">{yLabel}</span>}
      </div>
      <div className="tf-heat-load-tooltip__value">
        {formatter ? formatter(cell.value) : cell.value.toFixed(2)}
      </div>
      {cell.metadata && Object.entries(cell.metadata).map(([key, val]) => (
        <div key={key} className="tf-heat-load-tooltip__meta">
          <span className="tf-heat-load-tooltip__meta-key">{key}:</span>
          <span className="tf-heat-load-tooltip__meta-val">{String(val)}</span>
        </div>
      ))}
    </div>
  );
};

export default HeatLoadTooltip;
