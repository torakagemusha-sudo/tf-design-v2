/**
 * @fileoverview MinimapViewport — Viewport indicator overlay on the minimap.
 * Shows the currently visible region of the canvas as a draggable rectangle.
 */

import React, { useCallback, useRef } from 'react';
import type { GraphComponentProps } from './types';

export interface MinimapViewportProps extends GraphComponentProps {
  /** Indicator x position on minimap */
  x: number;
  /** Indicator y position on minimap */
  y: number;
  /** Indicator width */
  width: number;
  /** Indicator height */
  height: number;
  /** Whether the indicator is being dragged */
  dragging?: boolean;
  /** Callback when indicator is dragged */
  onDrag?: (dx: number, dy: number) => void;
  /** Callback when drag starts */
  onDragStart?: () => void;
  /** Callback when drag ends */
  onDragEnd?: () => void;
}

/**
 * MinimapViewport — Viewport indicator on the minimap.
 *
 * A semi-transparent rectangle overlaid on the minimap that shows
 * the region of the graph currently visible in the main canvas.
 * Can be dragged to pan the main viewport.
 */
export const MinimapViewport: React.FC<MinimapViewportProps> = ({
  className = '',
  style,
  x,
  y,
  width,
  height,
  dragging = false,
  onDrag,
  onDragStart,
  onDragEnd,
  ...rest
}) => {
  const dragRef = useRef<{ startX: number; startY: number } | null>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      dragRef.current = { startX: e.clientX, startY: e.clientY };
      onDragStart?.();

      const handleMove = (ev: MouseEvent) => {
        if (!dragRef.current) return;
        const dx = ev.clientX - dragRef.current.startX;
        const dy = ev.clientY - dragRef.current.startY;
        dragRef.current = { startX: ev.clientX, startY: ev.clientY };
        onDrag?.(dx, dy);
      };

      const handleUp = () => {
        dragRef.current = null;
        onDragEnd?.();
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleUp);
      };

      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
    },
    [onDrag, onDragStart, onDragEnd]
  );

  return (
    <rect
      className={`tf-minimap-viewport ${dragging ? 'tf-minimap-viewport--dragging' : ''} ${className}`}
      x={x}
      y={y}
      width={Math.max(width, 8)}
      height={Math.max(height, 6)}
      fill="rgba(107, 140, 188, 0.12)"
      stroke="#6b8cbc"
      strokeWidth={1}
      rx={2}
      style={{
        cursor: dragging ? 'grabbing' : 'grab',
        pointerEvents: 'auto',
        ...style,
      }}
      onMouseDown={handleMouseDown}
      {...rest}
    />
  );
};

MinimapViewport.displayName = 'MinimapViewport';
export default MinimapViewport;
