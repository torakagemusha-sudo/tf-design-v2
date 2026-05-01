import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { HeatCell } from './types';

/**
 * Props for HeatLoadCell component.
 *
 * @public
 */
export interface HeatLoadCellProps {
  value: number;
  row: number;
  col: number;
  color: string;
  formattedValue?: string;
  label?: string;
  onHover?: (row: number, col: number) => void;
  onClick?: (row: number, col: number) => void;
  className?: string;
}

/**
 * Individual cell within a heat load visualization with tooltip support.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <HeatLoadCell />
 * ```
 */
const HeatLoadCell: React.FC<HeatLoadCellProps> = ({
  value, row, col, color, formattedValue?, label?, onHover?, onClick?, className?
}}) => {
  return (
    <div
      className={`tf-heat-load-cell ${className || ''}`}
      style={{ backgroundColor: color }}
      onMouseEnter={() => onHover?.(row, col)}
      onClick={() => onClick?.(row, col)}
      role="gridcell"
      aria-label={`${label || 'Cell'} ${row},${col}: ${value}`}
    >
      <span className="tf-heat-load-cell__value">{formattedValue || value.toFixed(1)}</span>
    </div>
  );
};

export default HeatLoadCell;
