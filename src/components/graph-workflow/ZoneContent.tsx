/**
 * @fileoverview ZoneContent — Zone content area for node containment.
 * The droppable region within a zone where nodes are placed.
 */

import React from 'react';
import type { ReactNode, DragEvent } from 'react';
import type { GraphComponentProps } from './types';

export interface ZoneContentProps extends GraphComponentProps {
  /** Child nodes within the zone */
  children?: ReactNode;
  /** Whether the zone is collapsed */
  collapsed?: boolean;
  /** Padding inside the zone */
  padding?: number;
  /** Callback when a node is dropped into the zone */
  onNodeDrop?: (nodeId: string) => void;
  /** Callback when drag enters */
  onDragEnter?: (e: DragEvent) => void;
  /** Callback when drag leaves */
  onDragLeave?: (e: DragEvent) => void;
  /** Callback when drag is over */
  onDragOver?: (e: DragEvent) => void;
}

/**
 * ZoneContent — Zone content area.
 *
 * The droppable interior of a graph zone where nodes are placed.
 * Supports drag-and-drop of nodes into the zone.
 */
export const ZoneContent: React.FC<ZoneContentProps> = ({
  className = '',
  style,
  children,
  collapsed = false,
  padding = 8,
  onNodeDrop,
  onDragEnter,
  onDragLeave,
  onDragOver,
  ...rest
}) => {
  if (collapsed) return null;

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    onDragOver?.(e);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const nodeId = e.dataTransfer.getData('text/graph-node-id');
    if (nodeId) onNodeDrop?.(nodeId);
  };

  return (
    <div
      className={`tf-zone-content ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        padding,
        minHeight: 60,
        ...style,
      }}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      {...rest}
    >
      {children}
    </div>
  );
};

ZoneContent.displayName = 'ZoneContent';
export default ZoneContent;
