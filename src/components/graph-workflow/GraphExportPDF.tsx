/**
 * @fileoverview GraphExportPDF — Export graph as PDF document.
 * Generates a PDF representation of the current graph for printing or sharing.
 */

import React, { useCallback } from 'react';
import type { GraphNodeData, GraphEdgeData, GraphComponentProps } from './types';

export interface GraphExportPDFProps extends GraphComponentProps {
  /** Nodes to include in the PDF */
  nodes: GraphNodeData[];
  /** Edges to include in the PDF */
  edges: GraphEdgeData[];
  /** Filename without extension */
  filename?: string;
  /** Page size */
  pageSize?: 'a4' | 'letter' | 'legal';
  /** Page orientation */
  orientation?: 'portrait' | 'landscape';
  /** Title on the PDF */
  title?: string;
  /** Callback when PDF data is generated */
  onExport?: (pdfData: string) => void;
  /** Button tooltip */
  tooltip?: string;
}

const PAGE_SIZES = {
  a4: { width: 595, height: 842 },
  letter: { width: 612, height: 792 },
  legal: { width: 612, height: 1008 },
};

/**
 * GraphExportPDF — Export as PDF button.
 *
 * Generates a PDF document representation of the current graph.
 * The PDF includes nodes, edges, labels, and an optional title.
 *
 * @example
 * <GraphExportPDF
 *   nodes={allNodes}
 *   edges={allEdges}
 *   filename="workflow"
 *   pageSize="a4"
 *   orientation="landscape"
 *   title="Order Processing Workflow"
 *   onExport={(data) => download(data, 'workflow.pdf')}
 * />
 */
export const GraphExportPDF: React.FC<GraphExportPDFProps> = ({
  className = '',
  style,
  nodes,
  edges,
  filename = 'graph',
  pageSize = 'a4',
  orientation = 'landscape',
  title,
  onExport,
  tooltip = 'Export as PDF',
  ...rest
}) => {
  const handleExport = useCallback(() => {
    const page = PAGE_SIZES[pageSize];
    const pw = orientation === 'landscape' ? page.height : page.width;
    const ph = orientation === 'landscape' ? page.width : page.height;

    // Calculate bounds
    const xs = nodes.map((n) => n.position.x);
    const ys = nodes.map((n) => n.position.y);
    const minX = Math.min(...xs) - 20;
    const minY = Math.min(...ys) - 20;
    const maxX = Math.max(...xs.map((x, i) => x + (nodes[i].size?.width ?? 160))) + 20;
    const maxY = Math.max(...ys.map((y, i) => y + (nodes[i].size?.height ?? 64))) + 20;
    const contentW = maxX - minX;
    const contentH = maxY - minY;

    // Scale to fit page with margins
    const margin = 40;
    const availW = pw - margin * 2;
    const availH = ph - margin * 2 - (title ? 40 : 0);
    const scale = Math.min(availW / contentW, availH / contentH, 1);
    const offsetX = margin + (availW - contentW * scale) / 2;
    const offsetY = margin + (title ? 40 : 0) + (availH - contentH * scale) / 2;

    // Build SVG for PDF conversion
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('xmlns', ns);
    svg.setAttribute('width', String(pw));
    svg.setAttribute('height', String(ph));
    svg.setAttribute('viewBox', `0 0 ${pw} ${ph}`);

    // White background
    const bg = document.createElementNS(ns, 'rect');
    bg.setAttribute('width', '100%');
    bg.setAttribute('height', '100%');
    bg.setAttribute('fill', '#ffffff');
    svg.appendChild(bg);

    // Transform group
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('transform', `translate(${offsetX}, ${offsetY}) scale(${scale}) translate(${-minX}, ${-minY})`);
    svg.appendChild(g);

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
      line.setAttribute('stroke-width', String((edge.thickness ?? 2) / Math.max(scale, 0.5)));
      g.appendChild(line);

      if (edge.label) {
        const text = document.createElementNS(ns, 'text');
        text.setAttribute('x', String((sx + tx) / 2));
        text.setAttribute('y', String((sy + ty) / 2 - 5));
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#333333');
        text.setAttribute('font-size', String(11 / scale));
        text.setAttribute('font-family', 'Arial, sans-serif');
        text.textContent = edge.label;
        g.appendChild(text);
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
      rect.setAttribute('fill', '#f8f9fa');
      rect.setAttribute('stroke', node.color ?? '#4a6fa5');
      rect.setAttribute('stroke-width', '1');
      g.appendChild(rect);

      const text = document.createElementNS(ns, 'text');
      text.setAttribute('x', String(node.position.x + nw / 2));
      text.setAttribute('y', String(node.position.y + nh / 2 + 4));
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', '#333333');
      text.setAttribute('font-size', String(12 / scale));
      text.setAttribute('font-family', 'Arial, sans-serif');
      text.textContent = node.label;
      g.appendChild(text);
    });

    // Title
    if (title) {
      const titleText = document.createElementNS(ns, 'text');
      titleText.setAttribute('x', String(pw / 2));
      titleText.setAttribute('y', '30');
      titleText.setAttribute('text-anchor', 'middle');
      titleText.setAttribute('fill', '#333333');
      titleText.setAttribute('font-size', '16');
      titleText.setAttribute('font-weight', 'bold');
      titleText.setAttribute('font-family', 'Arial, sans-serif');
      titleText.textContent = title;
      svg.appendChild(titleText);
    }

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    onExport?.(svgString);
  }, [nodes, edges, pageSize, orientation, title, onExport]);

  return (
    <button
      className={`tf-graph-export-pdf ${className}`}
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
      📄
    </button>
  );
};

GraphExportPDF.displayName = 'GraphExportPDF';
export default GraphExportPDF;
