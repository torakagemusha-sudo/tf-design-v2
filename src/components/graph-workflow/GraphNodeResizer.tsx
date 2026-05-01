/**
 * @fileoverview GraphNodeResizer — Resize handles for graph nodes.
 * Provides corner and edge handles for resizing selected nodes.
 */

import React, { useCallback, useRef } from 'react';
import type { GraphComponentProps, Point2D, Size2D } from './types';

export interface GraphNodeResizerProps extends GraphComponentProps {
  /** Node position */
  position: Point2D;
  /** Node size */
  size: Size2D;
  /** Whether the resizer is visible (node is selected) */
  visible?: boolean;
  /** Whether the node is locked */
  locked?: boolean;
  /** Scale factor */
  scale?: number;
  /** Minimum size */
  minSize?: Size2D;
  /** Callback when resize starts */
  onResizeStart?: () => void;
  /** Callback during resize */
  onResize?: (size: Size2D, position: Point2D) => void;
  /** Callback when resize ends */
  onResizeEnd?: (size: Size2D, position: Point2D) => void;
}

type HandlePosition = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const HANDLE_POSITIONS: Record<HandlePosition, { cursor: string; style: React.CSSProperties }> = {
  n: { cursor: 'ns-resize', style: { top: -4, left: '50%', transform: 'translateX(-50%)' } },
  s: { cursor: 'ns-resize', style: { bottom: -4, left: '50%', transform: 'translateX(-50%)' } },
  e: { cursor: 'ew-resize', style: { top: '50%', right: -4, transform: 'translateY(-50%)' } },
  w: { cursor: 'ew-resize', style: { top: '50%', left: -4, transform: 'translateY(-50%)' } },
  ne: { cursor: 'nesw-resize', style: { top: -4, right: -4 } },
  nw: { cursor: 'nwse-resize', style: { top: -4, left: -4 } },
  se: { cursor: 'nwse-resize', style: { bottom: -4, right: -4 } },
  sw: { cursor: 'nesw-resize', style: { bottom: -4, left: -4 } },
};

/**
 * GraphNodeResizer — Node resize handles.
 *
 * Provides 8 resize handles (corners and edges) on a selected
 * node for interactive resizing.
 *
 * @example
 * <GraphNodeResizer
 *   position={node.position}
 *   size={node.size}
 *   visible={isSelected}
 *   onResize={(size, pos) => updateNodeSize(size, pos)}
 * />
 */
export const GraphNodeResizer: React.FC<GraphNodeResizerProps> = ({
  className = '',
  style,
  position,
  size,
  visible = false,
  locked = false,
  scale = 1,
  minSize = { width: 40, height: 30 },
  onResizeStart,
  onResize,
  onResizeEnd,
  ...rest
}) => {
  if (!visible || locked) return null;

  const handleSize = 8;

  const handleMouseDown = useCallback(
    (handle: HandlePosition, e: React.MouseEvent) => {
      e.stopPropagation();
      onResizeStart?.();

      const startX = e.clientX;
      const startY = e.clientY;
      const startW = size.width;
      const startH = size.height;
      const startPx = position.x;
      const startPy = position.y;

      const handleMove = (ev: MouseEvent) => {
        const dx = (ev.clientX - startX) / scale;
        const dy = (ev.clientY - startY) / scale;

        let newW = startW;
        let newH = startH;
        let newPx = startPx;
        let newPy = startPy;

        if (handle.includes('e')) newW = Math.max(minSize.width, startW + dx);
        if (handle.includes('w')) {
          newW = Math.max(minSize.width, startW - dx);
          newPx = startPx + (startW - newW);
        }
        if (handle.includes('s')) newH = Math.max(minSize.height, startH + dy);
        if (handle.includes('n')) {
          newH = Math.max(minSize.height, startH - dy);
          newPy = startPy + (startH - newH);
        }

        onResize?.({ width: newW, height: newH }, { x: newPx, y: newPy });
      };

      const handleUp = () => {
        onResizeEnd?.(size, position);
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleUp);
      };

      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
    },
    [size, position, scale, minSize, onResizeStart, onResize, onResizeEnd]
  );

  return (
    <div
      className={`tf-graph-node-resizer ${className}`}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        pointerEvents: 'none',
        ...style,
      }}
      {...rest}
    >
      {(Object.keys(HANDLE_POSITIONS) as HandlePosition[]).map((handle) => (
        <div
          key={handle}
          className={`tf-graph-node-resizer__handle tf-graph-node-resizer__handle--${handle}`}
          onMouseDown={(e) => handleMouseDown(handle, e)}
          style={{
            position: 'absolute',
            width: handleSize,
            height: handleSize,
            backgroundColor: '#4a6fa5',
            border: '1px solid #6b8cbc',
            borderRadius: handle.length === 2 ? 2 : '50%',
            pointerEvents: 'auto',
            cursor: HANDLE_POSITIONS[handle].cursor,
            ...HANDLE_POSITIONS[handle].style,
          }}
        />
      ))}
    </div>
  );
};

GraphNodeResizer.displayName = 'GraphNodeResizer';
export default GraphNodeResizer;
