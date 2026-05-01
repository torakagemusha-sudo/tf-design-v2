/**
 * @fileoverview Port — Base connection port on a graph node.
 * Handles connection initiation, validation, and visual state.
 */

import React, { useCallback } from 'react';
import type { PortData, GraphComponentProps } from './types';

export interface PortProps extends GraphComponentProps {
  /** Port data model */
  port: PortData;
  /** Parent node ID */
  nodeId: string;
  /** Whether the port is currently connected */
  connected?: boolean;
  /** Whether the port is being hovered */
  hovered?: boolean;
  /** Whether the port is highlighted for connection */
  highlighted?: boolean;
  /** Whether the port is disabled */
  disabled?: boolean;
  /** Scale factor for rendering */
  scale?: number;
  /** Callback when port is clicked */
  onClick?: (nodeId: string, portId: string) => void;
  /** Callback when mouse enters the port */
  onMouseEnter?: (nodeId: string, portId: string) => void;
  /** Callback when mouse leaves the port */
  onMouseLeave?: (nodeId: string, portId: string) => void;
  /** Callback when connection drag starts from this port */
  onConnectionStart?: (nodeId: string, portId: string) => void;
  /** Callback when connection drag ends on this port */
  onConnectionEnd?: (nodeId: string, portId: string) => void;
}

/**
 * Port — Base connection port on a graph node.
 *
 * Provides the visual anchor point and interaction surface for
 * creating connections between nodes. Supports hover, highlight,
 * and disabled states.
 *
 * @example
 * <Port
 *   port={portData}
 *   nodeId="node-1"
 *   onClick={(nId, pId) => handlePortClick(nId, pId)}
 * />
 */
export const Port: React.FC<PortProps> = ({
  className = '',
  style,
  port,
  nodeId,
  connected = false,
  hovered = false,
  highlighted = false,
  disabled = false,
  scale = 1,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onConnectionStart,
  onConnectionEnd,
  ...rest
}) => {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClick?.(nodeId, port.id);
    },
    [nodeId, port.id, onClick]
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onMouseEnter?.(nodeId, port.id);
    },
    [nodeId, port.id, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onMouseLeave?.(nodeId, port.id);
    },
    [nodeId, port.id, onMouseLeave]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      e.stopPropagation();
      onConnectionStart?.(nodeId, port.id);
    },
    [disabled, nodeId, port.id, onConnectionStart]
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onConnectionEnd?.(nodeId, port.id);
    },
    [nodeId, port.id, onConnectionEnd]
  );

  const typeClass = `tf-port--type-${port.type}`;
  const positionClass = `tf-port--position-${port.position}`;
  const connectedClass = connected ? 'tf-port--connected' : '';
  const hoveredClass = hovered ? 'tf-port--hovered' : '';
  const highlightedClass = highlighted ? 'tf-port--highlighted' : '';
  const disabledClass = disabled ? 'tf-port--disabled' : '';

  const portSize = 12 / scale;

  return (
    <button
      className={`tf-port ${typeClass} ${positionClass} ${connectedClass} ${hoveredClass} ${highlightedClass} ${disabledClass} ${className}`}
      style={{
        position: 'absolute',
        width: portSize,
        height: portSize,
        borderRadius: '50%',
        border: '2px solid',
        backgroundColor: connected ? '#4a6fa5' : '#1a2332',
        borderColor: highlighted ? '#f39c12' : hovered ? '#6b8cbc' : '#3a5274',
        cursor: disabled ? 'not-allowed' : 'crosshair',
        zIndex: 20,
        ...style,
      }}
      data-port-id={port.id}
      data-port-type={port.type}
      data-node-id={nodeId}
      title={port.label || `${port.type} port`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      type="button"
      {...rest}
    />
  );
};

Port.displayName = 'Port';

export default Port;
