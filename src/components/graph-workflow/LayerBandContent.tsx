/**
 * @fileoverview LayerBandContent — Swimlane content area for node placement.
 * The droppable region within a swimlane where nodes are positioned.
 */

import React from 'react';
import type { ReactNode, DragEvent } from 'react';
import type { GraphComponentProps } from './types';

export interface LayerBandContentProps extends GraphComponentProps {
  /** Children (nodes) rendered in the content area */
  children?: ReactNode;
  /** Whether the band is collapsed */
  collapsed?: boolean;
  /** Background color override */
  backgroundColor?: string;
  /** Callback when a node is dropped */
  onNodeDrop?: (nodeId: string) => void;
  /** Callback when drag enters the band */
  onDragEnter?: (e: DragEvent) => void;
  /** Callback when drag leaves the band */
  onDragLeave?: (e: DragEvent) => void;
  /** Callback when drag is over the band */
  onDragOver?: (e: DragEvent) => void;
}

/**
 * LayerBandContent — Swimlane content area.
 *
 * The droppable region within a swimlane band where graph nodes
 * are positioned. Supports drag-and-drop of nodes between lanes.
 */
export const LayerBandContent: React.FC<LayerBandContentProps> = ({
  className = '',
  style,
  children,
  collapsed = false,
  backgroundColor = 'transparent',
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
    if (nodeId) {
      onNodeDrop?.(nodeId);
    }
  };

  return (
    <div
      className={`tf-layer-band-content ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 100,
        backgroundColor,
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

LayerBandContent.displayName = 'LayerBandContent';
export default LayerBandContent;
