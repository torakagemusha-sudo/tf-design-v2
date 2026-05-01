/**
 * @fileoverview GraphNodeRotator — Rotation handle for rotating nodes.
 * Provides a handle above the node for interactive rotation.
 */

import React, { useCallback } from 'react';
import type { GraphComponentProps, Point2D } from './types';

export interface GraphNodeRotatorProps extends GraphComponentProps {
  /** Node position */
  position: Point2D;
  /** Node width */
  width: number;
  /** Current rotation in degrees */
  rotation?: number;
  /** Whether the rotator is visible */
  visible?: boolean;
  /** Whether the node is locked */
  locked?: boolean;
  /** Callback when rotation changes */
  onRotate?: (rotation: number) => void;
  /** Callback when rotation starts */
  onRotateStart?: () => void;
  /** Callback when rotation ends */
  onRotateEnd?: () => void;
}

/**
 * GraphNodeRotator — Node rotation handle.
 *
 * Provides a circular handle above the node that can be dragged
 * to rotate the node. Shows the current rotation angle.
 *
 * @example
 * <GraphNodeRotator
 *   position={node.position}
 *   width={node.size.width}
 *   rotation={node.rotation}
 *   visible={isSelected}
 *   onRotate={(deg) => updateRotation(deg)}
 * />
 */
export const GraphNodeRotator: React.FC<GraphNodeRotatorProps> = ({
  className = '',
  style,
  position,
  width,
  rotation = 0,
  visible = false,
  locked = false,
  onRotate,
  onRotateStart,
  onRotateEnd,
  ...rest
}) => {
  if (!visible || locked) return null;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onRotateStart?.();

      const centerX = position.x + width / 2;
      const centerY = position.y;

      const handleMove = (ev: MouseEvent) => {
        const dx = ev.clientX - centerX;
        const dy = ev.clientY - centerY;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        onRotate?.(angle);
      };

      const handleUp = () => {
        onRotateEnd?.();
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleUp);
      };

      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
    },
    [position, width, onRotate, onRotateStart, onRotateEnd]
  );

  return (
    <div
      className={`tf-graph-node-rotator ${className}`}
      style={{
        position: 'absolute',
        left: position.x + width / 2 - 8,
        top: position.y - 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'auto',
        ...style,
      }}
      {...rest}
    >
      {/* Rotation line */}
      <div
        style={{
          width: 1,
          height: 12,
          backgroundColor: '#4a6fa5',
        }}
      />
      {/* Handle */}
      <div
        className="tf-graph-node-rotator__handle"
        onMouseDown={handleMouseDown}
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: '#4a6fa5',
          border: '2px solid #6b8cbc',
          cursor: 'grab',
        }}
        title={`${rotation.toFixed(1)}°`}
      />
    </div>
  );
};

GraphNodeRotator.displayName = 'GraphNodeRotator';
export default GraphNodeRotator;
