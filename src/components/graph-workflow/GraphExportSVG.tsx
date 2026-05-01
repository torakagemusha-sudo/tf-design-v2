/**
 * @fileoverview GraphExportSVG — Export graph as SVG vector graphic.
 * Generates a scalable SVG representation of the current graph.
 */

import React, { useCallback } from 'react';
import type { GraphNodeData, GraphEdgeData, GraphComponentProps } from './types';

export interface GraphExportSVGProps extends GraphComponentProps {
  /** Nodes to include in the SVG */
  nodes: GraphNodeData[];
  /** Edges to include in the SVG */
  edges: GraphEdgeData[];
  /** Filename without extension */
  filename?: string;
  /** SVG width */
  width?: number;
  /** SVG height */
  height?: number;
  /** Whether to include node labels */
  includeLabels?: boolean;
  /** Callback when SVG is generated */
  onExport?: (svgString: string) => void;
  /** Button tooltip */
  tooltip?: string;
}

/**
 * GraphExportSVG — Export as SVG button.
 *
 * Generates a scalable vector graphic (SVG) representation of
 * the current graph with nodes, edges, and labels.
 *
 * @example
 * <GraphExportSVG
 *   nodes={allNodes}
 *   edges={allEdges}
 *   filename="workflow"
 *   onExport={(svg) => download(svg, 'workflow.svg')}
 * />
 */
export const GraphExportSVG: React.FC<GraphExportSVGProps> = ({
  className = '',
  style,
  nodes,
  edges,
  filename = 'graph',
  width = 1200,
  height = 800,
  includeLabels = true,
  onExport,
  tooltip = 'Export as SVG',
  ...rest
}) => {
  const handleExport = useCallback(() => {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('xmlns', ns);
    svg.setAttribute('width', String(width));
    svg.setAttribute('height', String(height));
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // Background
    const bg = document.createElementNS(ns, 'rect');
    bg.setAttribute('width', '100%');
    bg.setAttribute('height', '100%');
    bg.setAttribute('fill', '#0b0f19');
    svg.appendChild(bg);

    // Edges
    edges.forEach((edge) => {
      const src = nodes.find((n) => n.id === edge.source);
      const tgt = nodes.find((n) => n.id === edge.target);
      if (!src || !tgt) return;

      const sx = src.position.x + (src.size?.width ?? 160) / 2;
      const sy = src.position.y + (src.size?.height ?? 64) / 2;
      const tx = tgt.position.x + (tgt.size?.width ?? 160) / 2;
      const ty = tgt.position.y + (tgt.size?.height ?? 64) / 2;

      const line = document.createElementNS(ns, 'line');
      line.setAttribute('x1', String(sx));
      line.setAttribute('y1', String(sy));
      line.setAttribute('x2', String(tx));
      line.setAttribute('y2', String(ty));
      line.setAttribute('stroke', edge.color ?? '#4a6fa5');
      line.setAttribute('stroke-width', String(edge.thickness ?? 2));
      if (edge.style === 'dashed') line.setAttribute('stroke-dasharray', '8,4');
      if (edge.style === 'dotted') line.setAttribute('stroke-dasharray', '2,4');
      svg.appendChild(line);

      // Edge label
      if (includeLabels && edge.label) {
        const text = document.createElementNS(ns, 'text');
        text.setAttribute('x', String((sx + tx) / 2));
        text.setAttribute('y', String((sy + ty) / 2 - 5));
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#c8d6e5');
        text.setAttribute('font-size', '11');
        text.textContent = edge.label;
        svg.appendChild(text);
      }
    });

    // Nodes
    nodes.forEach((node) => {
      const nw = node.size?.width ?? 160;
      const nh = node.size?.height ?? 64;
      const rect = document.createElementNS(ns, 'rect');
      rect.setAttribute('x', String(node.position.x));
      rect.setAttribute('y', String(node.position.y));
      rect.setAttribute('width', String(nw));
      rect.setAttribute('height', String(nh));
      rect.setAttribute('rx', '4');
      rect.setAttribute('fill', '#1a2332');
      rect.setAttribute('stroke', node.color ?? '#4a6fa5');
      rect.setAttribute('stroke-width', '1');
      svg.appendChild(rect);

      if (includeLabels) {
        const text = document.createElementNS(ns, 'text');
        text.setAttribute('x', String(node.position.x + nw / 2));
        text.setAttribute('y', String(node.position.y + nh / 2 + 4));
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#c8d6e5');
        text.setAttribute('font-size', '12');
        text.textContent = node.label;
        svg.appendChild(text);
      }
    });

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    onExport?.(svgString);
  }, [nodes, edges, width, height, includeLabels, onExport]);

  return (
    <button
      className={`tf-graph-export-svg ${className}`}
      onClick={handleExport}
      title={tooltip}
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        backgroundColor: 'rgba(16, 22, 36, 0.95)',
        border: '1px solid #2a3a4e',
        borderRadius: 6,
        color: '#8b9db8',
        cursor: 'pointer',
        fontSize: 14,
        ...style,
      }}
      {...rest}
    >
      ⬢
    </button>
  );
};

GraphExportSVG.displayName = 'GraphExportSVG';
export default GraphExportSVG;
