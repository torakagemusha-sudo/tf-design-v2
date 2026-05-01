/**
 * @fileoverview ZoneHeader — Zone header bar with label, collapse toggle, and lock.
 * The titled header for a graph zone/region.
 */

import React from 'react';
import type { ReactNode } from 'react';
import type { GraphComponentProps } from './types';

export interface ZoneHeaderProps extends GraphComponentProps {
  /** Display label */
  label: string;
  /** Whether the zone is collapsed */
  collapsed?: boolean;
  /** Whether the zone is locked */
  locked?: boolean;
  /** Custom icon */
  icon?: ReactNode;
  /** Node count inside the zone */
  nodeCount?: number;
  /** Callback when collapse is toggled */
  onToggleCollapse?: () => void;
  /** Callback when the header is clicked */
  onClick?: () => void;
}

/**
 * ZoneHeader — Zone header bar.
 *
 * The labeled header bar for a graph zone showing the region name,
 * collapse toggle, lock indicator, and node count.
 */
export const ZoneHeader: React.FC<ZoneHeaderProps> = ({
  className = '',
  style,
  label,
  collapsed = false,
  locked = false,
  icon,
  nodeCount,
  onToggleCollapse,
  onClick,
  ...rest
}) => {
  return (
    <div
      className={`tf-zone-header ${collapsed ? 'tf-zone-header--collapsed' : ''} ${locked ? 'tf-zone-header--locked' : ''} ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '0 10px',
        height: 32,
        backgroundColor: 'rgba(42, 90, 138, 0.25)',
        borderBottom: '1px solid #2a5a8a',
        cursor: 'pointer',
        userSelect: 'none',
        ...style,
      }}
      onClick={onClick}
      {...rest}
    >
      <button
        className="tf-zone-header__toggle"
        onClick={(e) => {
          e.stopPropagation();
          onToggleCollapse?.();
        }}
        type="button"
        style={{ background: 'none', border: 'none', color: '#8b9db8', cursor: 'pointer', fontSize: 10 }}
      >
        {collapsed ? '▸' : '▾'}
      </button>

      {icon && <span className="tf-zone-header__icon">{icon}</span>}

      <span className="tf-zone-header__label" style={{ fontWeight: 600, fontSize: 12, color: '#c8d6e5' }}>
        {label}
      </span>

      {typeof nodeCount === 'number' && (
        <span className="tf-zone-header__count" style={{ marginLeft: 6, fontSize: 10, color: '#6b7f9e', background: '#1a2332', padding: '1px 5px', borderRadius: 8 }}>
          {nodeCount}
        </span>
      )}

      {locked && (
        <span className="tf-zone-header__lock" style={{ marginLeft: 'auto', fontSize: 10, color: '#6b7f9e' }}>🔒</span>
      )}
    </div>
  );
};

ZoneHeader.displayName = 'ZoneHeader';
export default ZoneHeader;
