/**
 * @fileoverview GraphCanvas — Main graph canvas with pan/zoom support.
 * The central viewport for rendering nodes, edges, and all graph overlays.
 */

import React, { useRef, useCallback, useEffect, useState } from 'react';
import type {
  Point2D,
  ViewportState,
  CanvasConfig,
  GraphNodeData,
  GraphEdgeData,
  CanvasComponentProps,
} from './types';

export interface GraphCanvasProps extends CanvasComponentProps {
  /** Active tool mode */
  tool?: string;
  /** Drag state indicator */
  isDragging?: boolean;
  /** Background color override */
  backgroundColor?: string;
  /** Callback when canvas is panned */
  onPan?: (delta: Point2D) => void;
  /** Callback when canvas is zoomed */
  onZoom?: (zoom: number, center?: Point2D) => void;
  /** Callback when canvas is clicked (empty area) */
  onCanvasClick?: (position: Point2D) => void;
  /** Callback when canvas is double-clicked */
  onCanvasDoubleClick?: (position: Point2D) => void;
}

/**
 * GraphCanvas — Main graph canvas with pan/zoom support.
 *
 * Renders the full graph viewport with configurable grid, zoom constraints,
 * and event handling for panning, zooming, and canvas-level interactions.
 *
 * @example
 * <GraphCanvas
 *   nodes={nodes}
 *   edges={edges}
 *   viewport={{ x: 0, y: 0, zoom: 1 }}
 *   config={canvasConfig}
 *   onViewportChange={(vp) => setViewport(vp)}
 * />
 */
export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  className = '',
  style,
  nodes,
  edges,
  viewport,
  config,
  selectedNodes = [],
  selectedEdges = [],
  tool = 'select',
  isDragging = false,
  backgroundColor = '#0b0f19',
  onViewportChange,
  onNodeSelect,
  onEdgeSelect,
  onNodeMove,
  onEdgeCreate,
  onContextMenu,
  onPan,
  onZoom,
  onCanvasClick,
  onCanvasDoubleClick,
  children,
  ...rest
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<Point2D>({ x: 0, y: 0 });
  const viewportRef = useRef<ViewportState>(viewport);

  useEffect(() => {
    viewportRef.current = viewport;
  }, [viewport]);

  const screenToWorld = useCallback(
    (screenX: number, screenY: number): Point2D => {
      const vp = viewportRef.current;
      return {
        x: (screenX - vp.x) / vp.zoom,
        y: (screenY - vp.y) / vp.zoom,
      };
    },
    []
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const vp = viewportRef.current;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const worldPos = screenToWorld(mouseX, mouseY);

      const delta = -e.deltaY * 0.001;
      const newZoom = Math.max(
        config.zoomRange?.[0] ?? 0.1,
        Math.min(config.zoomRange?.[1] ?? 5, vp.zoom * (1 + delta))
      );

      const newViewport: ViewportState = {
        x: mouseX - worldPos.x * newZoom,
        y: mouseY - worldPos.y * newZoom,
        zoom: newZoom,
      };

      onViewportChange?.(newViewport);
      onZoom?.(newZoom, worldPos);
    },
    [config.zoomRange, onViewportChange, onZoom, screenToWorld]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 1 || (e.button === 0 && tool === 'pan')) {
        setIsPanning(true);
        panStartRef.current = { x: e.clientX, y: e.clientY };
        e.preventDefault();
      }
    },
    [tool]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning) return;
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      panStartRef.current = { x: e.clientX, y: e.clientY };

      const newViewport: ViewportState = {
        ...viewportRef.current,
        x: viewportRef.current.x + dx,
        y: viewportRef.current.y + dy,
      };

      onViewportChange?.(newViewport);
      onPan?.({ x: dx, y: dy });
    },
    [isPanning, onViewportChange, onPan]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const pos = screenToWorld(
          e.clientX - rect.left,
          e.clientY - rect.top
        );
        onCanvasClick?.(pos);
        onNodeSelect?.([]);
        onEdgeSelect?.([]);
      }
    },
    [onCanvasClick, onNodeSelect, onEdgeSelect, screenToWorld]
  );

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const pos = screenToWorld(
          e.clientX - rect.left,
          e.clientY - rect.top
        );
        onCanvasDoubleClick?.(pos);
      }
    },
    [onCanvasDoubleClick, screenToWorld]
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const pos = screenToWorld(
        e.clientX - rect.left,
        e.clientY - rect.top
      );
      onContextMenu?.(pos, 'canvas');
    },
    [onContextMenu, screenToWorld]
  );

  const transformStyle = `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`;

  return (
    <div
      ref={canvasRef}
      className={`tf-graph-canvas ${isPanning ? 'tf-graph-canvas--panning' : ''} ${isDragging ? 'tf-graph-canvas--dragging' : ''} tf-graph-canvas--tool-${tool} ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor,
        cursor: isPanning ? 'grabbing' : tool === 'pan' ? 'grab' : 'default',
        ...style,
      }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      data-testid="graph-canvas"
      {...rest}
    >
      <div
        className="tf-graph-canvas__world"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: transformStyle,
          transformOrigin: '0 0',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};

GraphCanvas.displayName = 'GraphCanvas';

export default GraphCanvas;
