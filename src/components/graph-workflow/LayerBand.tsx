/**
 * @fileoverview LayerBand — Horizontal layer/swimlane band for organizing nodes.
 * Groups nodes into horizontal lanes similar to BPMN swimlanes.
 */

import React from 'react';
import type { ReactNode, CSSProperties } from 'react';
import type { GraphComponentProps } from './types';

export interface LayerBandProps extends GraphComponentProps {
  /** Unique identifier for the layer */
  id: string;
  /** Display label for the swimlane */
  label: string;
  /** Band background color */
  color?: string;
  /** Band height in pixels */
  height?: number;
  /** Whether the band is collapsed */
  collapsed?: boolean;
  /** Whether the band is locked */
  locked?: boolean;
  /** Visual pattern style */
  pattern?: 'solid' | 'striped' | 'dotted';
  /** Header component override */
  header?: ReactNode;
  /** Content area component override */
  content?: ReactNode;
  /** Children rendered in the content area */
  children?: ReactNode;
  /** Callback when collapse is toggled */
  onToggleCollapse?: (id: string) => void;
  /** Callback when the band is clicked */
  onSelect?: (id: string) => void;
}

/**
 * LayerBand — Horizontal layer/swimlane band.
 *
 * Organizes graph nodes into horizontal swimlanes, similar to BPMN
 * pools and lanes. Each band has a labeled header and a content area
 * where nodes are placed.
 *
 * @example
 * <LayerBand id="lane-1" label="Order Processing" color="#1a3a5c">
 *   {nodesInLane.map(node => <GraphNode key={node.id} node={node} />)}
 * </LayerBand>
 */
export const LayerBand: React.FC<LayerBandProps> = ({
  className = '',
  style,
  id,
  label,
  color = '#1a2332',
  height = 200,
  collapsed = false,
  locked = false,
  pattern = 'solid',
  header,
  content,
  children,
  onToggleCollapse,
  onSelect,
  ...rest
}) => {
  const patternClass = `tf-layer-band--pattern-${pattern}`;
  const collapsedClass = collapsed ? 'tf-layer-band--collapsed' : '';
  const lockedClass = locked ? 'tf-layer-band--locked' : '';

  return (
    <div
      className={`tf-layer-band ${patternClass} ${collapsedClass} ${lockedClass} ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: collapsed ? 36 : height,
        backgroundColor: color,
        borderBottom: '1px solid #2a3a4e',
        overflow: 'hidden',
        ...style,
      }}
      data-layer-id={id}
      data-testid={`layer-band-${id}`}
      onClick={() => onSelect?.(id)}
      {...rest}
    >
      {header || (
        <div
          className="tf-layer-band__header"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            height: 36,
            borderBottom: '1px solid #2a3a4e',
            backgroundColor: `${color}cc`,
            cursor: 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleCollapse?.(id);
          }}
        >
          <span className="tf-layer-band__collapse-indicator">
            {collapsed ? '▸' : '▾'}
          </span>
          <span className="tf-layer-band__label" style={{ marginLeft: 8, fontWeight: 600, fontSize: 13 }}>
            {label}
          </span>
          {locked && (
            <span className="tf-layer-band__lock" style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.6 }}>
              🔒
            </span>
          )}
        </div>
      )}

      {!collapsed && (content || (
        <div className="tf-layer-band__content" style={{ position: 'relative', height: height - 36 }}>
          {children}
        </div>
      ))}
    </div>
  );
};

LayerBand.displayName = 'LayerBand';

export default LayerBand;
