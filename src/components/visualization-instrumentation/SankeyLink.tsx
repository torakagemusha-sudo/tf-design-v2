import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { SankeyLinkData } from './types';

/**
 * Props for SankeyLink component.
 *
 * @public
 */
export interface SankeyLinkProps {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  value: number;
  color?: string;
  opacity?: number;
  className?: string;
}

/**
 * Curved link connecting two nodes in a Sankey diagram with width proportional to flow.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <SankeyLink />
 * ```
 */
const SankeyLink: React.FC<SankeyLinkProps> = ({
  sourceX, sourceY, targetX, targetY, value, color, opacity, className
}) => {
  const d = `M ${sourceX} ${sourceY} C ${sourceX + 50} ${sourceY}, ${targetX - 50} ${targetY}, ${targetX} ${targetY}`;

  return (
    <path
      d={d}
      className={`tf-sankey-link ${className || ''}`}
      style={{ stroke: color || '#0ea5e9', strokeWidth: Math.max(1, value / 5), fill: 'none', opacity: opacity || 0.4 }}
    />
  );
};

export default SankeyLink;
