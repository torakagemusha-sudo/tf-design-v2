import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { TreemapNode } from './types';

/**
 * Props for Treemap component.
 *
 * @public
 */
export interface TreemapProps {
  data: TreemapNode[];
  width?: number;
  height?: number;
  onNodeClick?: (node: TreemapNode) => void;
  colorScale?: string[];
  className?: string;
}

/**
 * Treemap chart for displaying hierarchical data as nested rectangles.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <Treemap />
 * ```
 */
const Treemap: React.FC<TreemapProps> = ({
  data, width, height, onNodeClick, colorScale, className
}) => {
  const w = width || 600;
  const h = height || 400;

  const layout = useMemo(() => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let currentX = 0;
    let currentY = 0;
    let rowHeight = 0;
    return data.map((d) => {
      const nodeW = (d.value / total) * w;
      const nodeH = (d.value / total) * h * 2;
      if (currentX + nodeW > w) { currentX = 0; currentY += rowHeight; rowHeight = 0; }
      rowHeight = Math.max(rowHeight, nodeH);
      const result = { x: currentX, y: currentY, w: nodeW, h: nodeH, ...d };
      currentX += nodeW;
      return result;
    });
  }, [data, w, h]);

  return (
    <div className={`tf-treemap ${className || ''}`}>
      <svg className="tf-treemap__svg" viewBox={`0 0 ${w} ${h}`}>
        {layout.map((node, i) => (
          <g key={i} className="tf-treemap__node" onClick={() => onNodeClick?.(node)}>
            <rect x={node.x} y={node.y} width={Math.max(node.w, 1)} height={Math.max(node.h, 1)} className="tf-treemap__rect" style={{ fill: node.color || '#0ea5e9' }} />
            {node.w > 40 && node.h > 20 && (
              <text x={node.x + node.w / 2} y={node.y + node.h / 2} className="tf-treemap__label" textAnchor="middle" dominantBaseline="middle">{node.label}</text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default Treemap;
