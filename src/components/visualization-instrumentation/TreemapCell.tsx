import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { TreemapNode } from './types';

/**
 * Props for TreemapCell component.
 *
 * @public
 */
export interface TreemapCellProps {
  label: string;
  value: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  children?: TreemapNode[];
  onClick?: () => void;
  className?: string;
}

/**
 * Individual cell within a treemap representing a data item.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <TreemapCell />
 * ```
 */
const TreemapCell: React.FC<TreemapCellProps> = ({
  label, value, x, y, width, height, color, children, onClick, className
}) => {
  return (
    <g className={`tf-treemap-cell ${className || ''}`} onClick={onClick}>
      <rect x={x} y={y} width={Math.max(width, 0.5)} height={Math.max(height, 0.5)} className="tf-treemap-cell__rect" style={{ fill: color || '#0ea5e9' }} />
      {width > 30 && height > 15 && (
        <>
          <text x={x + width / 2} y={y + height / 2 - 5} className="tf-treemap-cell__label" textAnchor="middle" dominantBaseline="middle">{label}</text>
          <text x={x + width / 2} y={y + height / 2 + 10} className="tf-treemap-cell__value" textAnchor="middle" dominantBaseline="middle">{value.toLocaleString()}</text>
        </>
      )}
    </g>
  );
};

export default TreemapCell;
