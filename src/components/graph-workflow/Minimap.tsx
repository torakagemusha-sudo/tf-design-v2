/**
 * @fileoverview Minimap — Mini overview map showing the full graph at a glance.
 * Provides a zoomed-out view with a viewport indicator for navigation.
 */

import React, { useCallback } from 'react';
import type { CSSProperties } from 'react';
import type { ViewportState, GraphNodeData, GraphEdgeData, GraphComponentProps } from './types';

export interface MinimapProps extends GraphComponentProps {
  /** Canvas viewport state */
  viewport: ViewportState;
  /** All nodes to render on the minimap */
  nodes: GraphNodeData[];
  /** All edges to render on the minimap */
  edges?: GraphEdgeData[];
  /** Minimap width in pixels */
  width?: number;
  /** Minimap height in pixels */
  height?: number;
  /** Canvas world bounds */
  worldBounds?: { minX: number; minY: number; maxX: number; maxY: number };
  /** Whether the minimap is visible */
  visible?: boolean;
  /** Position of the minimap on the canvas */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** Callback when the viewport is panned via minimap */
  onViewportPan?: (viewport: ViewportState) => void;
  /** Callback when a node is clicked on the minimap */
  onNodeClick?: (nodeId: string) => void;
}

/**
 * Minimap — Mini overview map.
 *
 * Provides a thumbnail view of the entire graph with a rectangle
 * indicating the current viewport. Clicking on the minimap pans
 * the main viewport to that region.
 *
 * @example
 * <Minimap
 *   viewport={{ x: 0, y: 0, zoom: 1 }}
 *   nodes={allNodes}
 *   edges={allEdges}
 *   width={200}
 *   height={150}
 * />
 */
export const Minimap: React.FC<MinimapProps> = ({
  className = '',
  style,
  viewport,
  nodes,
  edges = [],
  width = 200,
  height = 150,
  worldBounds,
  visible = true,
  position = 'bottom-right',
  onViewportPan,
  onNodeClick,
  ...rest
}) => {
  const computeBounds = useCallback(() => {
    if (worldBounds) return worldBounds;
    if (nodes.length === 0) {
      return { minX: 0, minY: 0, maxX: 1000, maxY: 800 };
    }
    const xs = nodes.map((n) => n.position.x);
    const ys = nodes.map((n) => n.position.y);
    return {
      minX: Math.min(...xs) - 100,
      minY: Math.min(...ys) - 100,
      maxX: Math.max(...xs) + 260,
      maxY: Math.max(...ys) + 164,
    };
  }, [worldBounds, nodes]);

  const bounds = computeBounds();
  const worldW = bounds.maxX - bounds.minX;
  const worldH = bounds.maxY - bounds.minY;
  const scaleX = width / worldW;
  const scaleY = height / worldH;
  const scale = Math.min(scaleX, scaleY);
  const offsetX = (width - worldW * scale) / 2;
  const offsetY = (height - worldH * scale) / 2;

  const worldToMinimap = useCallback(
    (wx: number, wy: number) => ({
      x: offsetX + (wx - bounds.minX) * scale,
      y: offsetY + (wy - bounds.minY) * scale,
    }),
    [offsetX, offsetY, scale, bounds]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const worldX = bounds.minX + (mx - offsetX) / scale;
      const worldY = bounds.minY + (my - offsetY) / scale;

      onViewportPan?.({
        x: -(worldX * viewport.zoom - rect.width / 2),
        y: -(worldY * viewport.zoom - rect.height / 2),
        zoom: viewport.zoom,
      });
    },
    [bounds, offsetX, offsetY, scale, viewport.zoom, onViewportPan]
  );

  if (!visible) return null;

  const positionStyle: CSSProperties = {
    position: 'absolute',
    zIndex: 100,
  };
  switch (position) {
    case 'bottom-right':
      positionStyle.right = 16;
      positionStyle.bottom = 16;
      break;
    case 'bottom-left':
      positionStyle.left = 16;
      positionStyle.bottom = 16;
      break;
    case 'top-right':
      positionStyle.right = 16;
      positionStyle.top = 16;
      break;
    case 'top-left':
      positionStyle.left = 16;
      positionStyle.top = 16;
      break;
  }

  const vpRect = {
    x: worldToMinimap(-viewport.x / viewport.zoom, -viewport.y / viewport.zoom).x,
    y: worldToMinimap(-viewport.x / viewport.zoom, -viewport.y / viewport.zoom).y,
    width: (width / scaleX) * scale,
    height: (height / scaleY) * scale,
  };

  return (
    <div
      className={`tf-minimap ${className}`}
      style={{
        width,
        height,
        backgroundColor: 'rgba(11, 15, 25, 0.9)',
        border: '1px solid #2a3a4e',
        borderRadius: 4,
        overflow: 'hidden',
        ...positionStyle,
        ...style,
      }}
      {...rest}
    >
      <svg
        width={width}
        height={height}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        {/* Edge mini-representations */}
        {edges.map((edge) => {
          const src = nodes.find((n) => n.id === edge.source);
          const tgt = nodes.find((n) => n.id === edge.target);
          if (!src || !tgt) return null;
          const s = worldToMinimap(src.position.x, src.position.y);
          const t = worldToMinimap(tgt.position.x, tgt.position.y);
          return (
            <line
              key={edge.id}
              x1={s.x + 4}
              y1={s.y + 4}
              x2={t.x + 4}
              y2={t.y + 4}
              stroke="#3a5274"
              strokeWidth={0.5}
            />
          );
        })}

        {/* Node mini-representations */}
        {nodes.map((node) => {
          const pos = worldToMinimap(node.position.x, node.position.y);
          const w = (node.size?.width ?? 160) * scale;
          const h = (node.size?.height ?? 64) * scale;
          return (
            <rect
              key={node.id}
              x={pos.x}
              y={pos.y}
              width={Math.max(w, 4)}
              height={Math.max(h, 4)}
              fill={node.selected ? '#4a6fa5' : '#2a3a4e'}
              stroke={node.selected ? '#6b8cbc' : 'none'}
              strokeWidth={0.5}
              rx={1}
              onClick={(e) => {
                e.stopPropagation();
                onNodeClick?.(node.id);
              }}
              style={{ cursor: 'pointer' }}
            />
          );
        })}

        {/* Viewport indicator */}
        <rect
          x={vpRect.x}
          y={vpRect.y}
          width={Math.max(vpRect.width, 8)}
          height={Math.max(vpRect.height, 6)}
          fill="rgba(107, 140, 188, 0.15)"
          stroke="#6b8cbc"
          strokeWidth={0.8}
          rx={1}
          style={{ pointerEvents: 'none' }}
        />
      </svg>
    </div>
  );
};

Minimap.displayName = 'Minimap';

export default Minimap;
