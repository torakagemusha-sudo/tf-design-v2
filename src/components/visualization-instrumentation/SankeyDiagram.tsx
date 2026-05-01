import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { SankeyNodeData, SankeyLinkData } from './types';

/**
 * Props for SankeyDiagram component.
 *
 * @public
 */
export interface SankeyDiagramProps {
  nodes: SankeyNodeData[];
  links: SankeyLinkData[];
  width?: number;
  height?: number;
  nodeWidth?: number;
  onNodeClick?: (node: SankeyNodeData) => void;
  className?: string;
}

/**
 * Flow diagram showing magnitude of flow between nodes in a system.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <SankeyDiagram />
 * ```
 */
const SankeyDiagram: React.FC<SankeyDiagramProps> = ({
  nodes, links, width?, height?, nodeWidth?, onNodeClick?, className?
}}) => {
  const w = width || 800;
  const h = height || 500;
  const nodeW = nodeWidth || 20;

  return (
    <div className={`tf-sankey-diagram ${className || ''}`}>
      <svg className="tf-sankey-diagram__svg" viewBox={`0 0 ${w} ${h}`}>
        {links.map((link, i) => (
          <path key={i} d={`M ${link.sourceX + nodeW} ${link.sourceY} C ${link.sourceX + nodeW + 50} ${link.sourceY}, ${link.targetX - 50} ${link.targetY}, ${link.targetX} ${link.targetY}`} className="tf-sankey-diagram__link" style={{ stroke: link.color || '#0ea5e9', strokeWidth: Math.max(1, link.value / 5), opacity: 0.4 }} />
        ))}
        {nodes.map((node, i) => (
          <g key={i} className="tf-sankey-diagram__node" onClick={() => onNodeClick?.(node)}>
            <rect x={node.x} y={node.y} width={nodeW} height={node.height} className="tf-sankey-diagram__node-rect" style={{ fill: node.color || '#0ea5e9' }} />
            <text x={node.x + (node.x < w / 2 ? nodeW + 5 : -5)} y={node.y + node.height / 2} className="tf-sankey-diagram__node-label" textAnchor={node.x < w / 2 ? 'start' : 'end'} dominantBaseline="middle">{node.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default SankeyDiagram;
