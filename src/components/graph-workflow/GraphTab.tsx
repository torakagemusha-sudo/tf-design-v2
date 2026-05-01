/**
 * @fileoverview GraphTab — Individual graph tab in the tab bar.
 * A single tab representing one open graph with label, icon, and close button.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphTabProps extends GraphComponentProps {
  /** Tab unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Tab icon */
  icon?: string;
  /** Whether this tab is active */
  active?: boolean;
  /** Whether the graph has unsaved changes */
  modified?: boolean;
  /** Whether the tab can be closed */
  closable?: boolean;
  /** Callback when the tab is selected */
  onSelect?: (id: string) => void;
  /** Callback when the tab is closed */
  onClose?: (id: string) => void;
  /** Callback when the tab is double-clicked (rename) */
  onDoubleClick?: (id: string) => void;
}

/**
 * GraphTab — Individual graph tab.
 *
 * A single tab in the graph tab bar showing the graph name,
 * modification indicator, and a close button.
 *
 * @example
 * <GraphTab
 *   id="tab-1"
 *   label="Order Flow"
 *   active={true}
 *   modified={true}
 *   onSelect={(id) => switchTab(id)}
 *   onClose={(id) => closeTab(id)}
 * />
 */
export const GraphTab: React.FC<GraphTabProps> = ({
  className = '',
  style,
  id,
  label,
  icon,
  active = false,
  modified = false,
  closable = true,
  onSelect,
  onClose,
  onDoubleClick,
  ...rest
}) => {
  return (
    <div
      className={`tf-graph-tab ${active ? 'tf-graph-tab--active' : ''} ${modified ? 'tf-graph-tab--modified' : ''} ${className}`}
      onClick={() => onSelect?.(id)}
      onDoubleClick={() => onDoubleClick?.(id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        backgroundColor: active ? '#1a3050' : 'transparent',
        borderBottom: active ? '2px solid #4a6fa5' : '2px solid transparent',
        cursor: 'pointer',
        userSelect: 'none',
        minWidth: 0,
        ...style,
      }}
      {...rest}
    >
      {icon && <span className="tf-graph-tab__icon" style={{ fontSize: 10 }}>{icon}</span>}
      <span
        className="tf-graph-tab__label"
        style={{
          fontSize: 12,
          color: active ? '#c8d6e5' : '#8b9db8',
          fontWeight: active ? 500 : 400,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {label}
      </span>
      {modified && (
        <span className="tf-graph-tab__dot" style={{ color: '#f39c12', fontSize: 14, lineHeight: 1 }}>•</span>
      )}
      {closable && (
        <button
          className="tf-graph-tab__close"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.(id);
          }}
          type="button"
          style={{
            background: 'none',
            border: 'none',
            color: '#6b7f9e',
            cursor: 'pointer',
            fontSize: 10,
            padding: 0,
            marginLeft: 2,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};

GraphTab.displayName = 'GraphTab';
export default GraphTab;
