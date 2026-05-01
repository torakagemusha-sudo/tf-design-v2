/**
 * @fileoverview Zone — Graph zone/region for grouping related nodes visually.
 * A bounded rectangular area that highlights a functional region of the graph.
 */

import React from 'react';
import type { ReactNode, CSSProperties } from 'react';
import type { GraphComponentProps, Point2D, Size2D } from './types';

export interface ZoneProps extends GraphComponentProps {
  /** Zone unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Top-left position */
  position: Point2D;
  /** Zone dimensions */
  size: Size2D;
  /** Background color with alpha */
  color?: string;
  /** Border color */
  borderColor?: string;
  /** Pattern style */
  pattern?: 'solid' | 'striped' | 'dotted';
  /** Whether the zone is collapsed */
  collapsed?: boolean;
  /** Whether the zone is locked */
  locked?: boolean;
  /** Custom header */
  header?: ReactNode;
  /** Custom content wrapper */
  content?: ReactNode;
  /** Child nodes inside the zone */
  children?: ReactNode;
  /** Callback when zone is selected */
  onSelect?: (id: string) => void;
  /** Callback when collapse is toggled */
  onToggleCollapse?: (id: string) => void;
}

/**
 * Zone — Graph zone/region.
 *
 * A bounded rectangular region that visually groups related nodes.
 * Used to highlight functional domains, ownership boundaries, or
 * critical sections of a workflow.
 *
 * @example
 * <Zone
 *   id="auth-zone"
 *   label="Authentication"
 *   position={{ x: 50, y: 50 }}
 *   size={{ width: 400, height: 300 }}
 *   color="rgba(26, 60, 100, 0.2)"
 * />
 */
export const Zone: React.FC<ZoneProps> = ({
  className = '',
  style,
  id,
  label,
  position,
  size,
  color = 'rgba(26, 60, 100, 0.15)',
  borderColor = '#2a5a8a',
  pattern = 'solid',
  collapsed = false,
  locked = false,
  header,
  content,
  children,
  onSelect,
  onToggleCollapse,
  ...rest
}) => {
  const patternClass = `tf-zone--pattern-${pattern}`;
  const collapsedClass = collapsed ? 'tf-zone--collapsed' : '';
  const lockedClass = locked ? 'tf-zone--locked' : '';

  const borderStyle: CSSProperties['borderStyle'] =
    pattern === 'dotted' ? 'dotted' : pattern === 'striped' ? 'dashed' : 'solid';

  return (
    <div
      className={`tf-zone ${patternClass} ${collapsedClass} ${lockedClass} ${className}`}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: collapsed ? 32 : size.height,
        backgroundColor: color,
        border: `2px ${borderStyle} ${borderColor}`,
        borderRadius: 4,
        pointerEvents: 'auto',
        ...style,
      }}
      data-zone-id={id}
      data-testid={`zone-${id}`}
      onClick={() => onSelect?.(id)}
      {...rest}
    >
      {header || (
        <div
          className="tf-zone__header"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            height: 32,
            backgroundColor: `${borderColor}33`,
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleCollapse?.(id);
          }}
        >
          <span className="tf-zone__collapse-indicator" style={{ fontSize: 10, marginRight: 6 }}>
            {collapsed ? '▸' : '▾'}
          </span>
          <span className="tf-zone__label" style={{ fontWeight: 600, fontSize: 12, color: '#c8d6e5' }}>
            {label}
          </span>
          {locked && (
            <span className="tf-zone__lock" style={{ marginLeft: 'auto', fontSize: 10, opacity: 0.6 }}>🔒</span>
          )}
        </div>
      )}

      {!collapsed && (content || (
        <div className="tf-zone__content" style={{ position: 'relative', width: '100%', height: size.height - 32 }}>
          {children}
        </div>
      ))}
    </div>
  );
};

Zone.displayName = 'Zone';

export default Zone;
