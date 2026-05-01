/**
 * @fileoverview MinimapNode — Node representation in the minimap.
 * A scaled-down rectangle representing a single node on the overview map.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface MinimapNodeProps extends GraphComponentProps {
  /** X position on minimap */
  x: number;
  /** Y position on minimap */
  y: number;
  /** Width on minimap */
  width: number;
  /** Height on minimap */
  height: number;
  /** Whether the node is selected */
  selected?: boolean;
  /** Node type for coloring */
  nodeType?: string;
  /** Callback when clicked */
  onClick?: () => void;
}

/**
 * MinimapNode — Node representation in the minimap.
 *
 * A small rectangle on the minimap that represents a single graph
 * node. Color changes when the node is selected.
 */
export const MinimapNode: React.FC<MinimapNodeProps> = ({
  className = '',
  style,
  x,
  y,
  width,
  height,
  selected = false,
  nodeType = 'default',
  onClick,
  ...rest
}) => {
  const fillColor = selected ? '#4a6fa5' : '#2a3a4e';
  const strokeColor = selected ? '#6b8cbc' : 'transparent';

  return (
    <rect
      className={`tf-minimap-node ${selected ? 'tf-minimap-node--selected' : ''} tf-minimap-node--type-${nodeType} ${className}`}
      x={x}
      y={y}
      width={Math.max(width, 3)}
      height={Math.max(height, 3)}
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth={selected ? 0.8 : 0}
      rx={1}
      style={{ cursor: 'pointer', ...style }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      {...rest}
    />
  );
};

MinimapNode.displayName = 'MinimapNode';
export default MinimapNode;
