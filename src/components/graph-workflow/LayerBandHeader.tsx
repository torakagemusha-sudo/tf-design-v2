/**
 * @fileoverview LayerBandHeader — Swimlane header with label, controls, and status.
 * The titled bar at the top of each swimlane band.
 */

import React from 'react';
import type { ReactNode } from 'react';
import type { GraphComponentProps } from './types';

export interface LayerBandHeaderProps extends GraphComponentProps {
  /** Display label */
  label: string;
  /** Whether the band is collapsed */
  collapsed?: boolean;
  /** Whether the band is locked */
  locked?: boolean;
  /** Node count in the band */
  nodeCount?: number;
  /** Custom icon */
  icon?: ReactNode;
  /** Callback when collapse is toggled */
  onToggleCollapse?: () => void;
  /** Callback when settings are clicked */
  onSettingsClick?: () => void;
}

/**
 * LayerBandHeader — Swimlane header.
 *
 * The labeled header bar for a swimlane layer band showing the
 * lane name, collapse toggle, lock indicator, and node count.
 */
export const LayerBandHeader: React.FC<LayerBandHeaderProps> = ({
  className = '',
  style,
  label,
  collapsed = false,
  locked = false,
  nodeCount,
  icon,
  onToggleCollapse,
  onSettingsClick,
  ...rest
}) => {
  return (
    <div
      className={`tf-layer-band-header ${collapsed ? 'tf-layer-band-header--collapsed' : ''} ${locked ? 'tf-layer-band-header--locked' : ''} ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 12px',
        height: 36,
        backgroundColor: 'rgba(26, 35, 50, 0.85)',
        borderBottom: '1px solid #2a3a4e',
        userSelect: 'none',
        ...style,
      }}
      {...rest}
    >
      <button
        className="tf-layer-band-header__toggle"
        onClick={onToggleCollapse}
        type="button"
        style={{ background: 'none', border: 'none', color: '#8b9db8', cursor: 'pointer', fontSize: 10 }}
      >
        {collapsed ? '▸' : '▾'}
      </button>

      {icon && (
        <span className="tf-layer-band-header__icon">{icon}</span>
      )}

      <span className="tf-layer-band-header__label" style={{ fontWeight: 600, fontSize: 13, color: '#c8d6e5' }}>
        {label}
      </span>

      {typeof nodeCount === 'number' && (
        <span className="tf-layer-band-header__count" style={{ marginLeft: 8, fontSize: 11, color: '#6b7f9e', backgroundColor: '#1a2332', padding: '1px 6px', borderRadius: 10 }}>
          {nodeCount}
        </span>
      )}

      <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
        {locked && (
          <span className="tf-layer-band-header__lock" style={{ fontSize: 11, color: '#6b7f9e' }}>🔒</span>
        )}
        <button
          className="tf-layer-band-header__settings"
          onClick={(e) => {
            e.stopPropagation();
            onSettingsClick?.();
          }}
          type="button"
          style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 12 }}
        >
          ⋮
        </button>
      </div>
    </div>
  );
};

LayerBandHeader.displayName = 'LayerBandHeader';
export default LayerBandHeader;
