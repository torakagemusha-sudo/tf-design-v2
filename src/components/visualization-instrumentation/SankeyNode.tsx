import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { SankeyNodeData } from './types';

/**
 * Props for SankeyNode component.
 *
 * @public
 */
export interface SankeyNodeProps {
  id: string;
  label: string;
  x: number;
  y: number;
  height: number;
  color?: string;
  value?: number;
  className?: string;
}

/**
 * Individual node in a Sankey diagram representing a flow source or destination.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <SankeyNode />
 * ```
 */
const SankeyNode: React.FC<SankeyNodeProps> = ({
  id, label, x, y, height, color, value, className
}) => {
  return (
    <g className={`tf-sankey-node ${className || ''}`}>
      <rect x={x} y={y} width={20} height={height} className="tf-sankey-node__rect" style={{ fill: color || '#0ea5e9' }} />
      <text x={x + 10} y={y - 5} className="tf-sankey-node__label" textAnchor="middle">{label}</text>
      {value !== undefined && <text x={x + 10} y={y + height + 15} className="tf-sankey-node__value" textAnchor="middle">{value.toFixed(0)}</text>}
    </g>
  );
};

export default SankeyNode;
