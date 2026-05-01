/**
 * @fileoverview GraphTabBar — Multi-graph tab bar for switching between open graphs.
 * Provides tabs for managing multiple open graph editor instances.
 */

import React from 'react';
import type { ReactNode } from 'react';
import type { GraphComponentProps } from './types';

export interface GraphTabData {
  id: string;
  label: string;
  icon?: string;
  modified?: boolean;
  closable?: boolean;
}

export interface GraphTabBarProps extends GraphComponentProps {
  /** Tab data for each open graph */
  tabs: GraphTabData[];
  /** Currently active tab ID */
  activeTabId?: string;
  /** Callback when a tab is selected */
  onTabSelect?: (tabId: string) => void;
  /** Callback when a tab is closed */
  onTabClose?: (tabId: string) => void;
  /** Callback when a new tab is requested */
  onNewTab?: () => void;
  /** Custom tab renderer */
  renderTab?: (tab: GraphTabData, isActive: boolean) => ReactNode;
}

/**
 * GraphTabBar — Multi-graph tab bar.
 *
 * A horizontal tab bar for managing multiple open graph editor
 * instances. Shows modification indicators and supports tab closing.
 *
 * @example
 * <GraphTabBar
 *   tabs={[
 *     { id: '1', label: 'Order Flow', modified: false },
 *     { id: '2', label: 'Auth Flow', modified: true },
 *   ]}
 *   activeTabId="1"
 *   onTabSelect={(id) => switchToTab(id)}
 * />
 */
export const GraphTabBar: React.FC<GraphTabBarProps> = ({
  className = '',
  style,
  tabs,
  activeTabId,
  onTabSelect,
  onTabClose,
  onNewTab,
  renderTab,
  ...rest
}) => {
  return (
    <div
      className={`tf-graph-tab-bar ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(11, 15, 25, 0.95)',
        borderBottom: '1px solid #2a3a4e',
        overflowX: 'auto',
        ...style,
      }}
      {...rest}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        if (renderTab) {
          return <React.Fragment key={tab.id}>{renderTab(tab, isActive)}</React.Fragment>;
        }
        return (
          <div
            key={tab.id}
            className={`tf-graph-tab ${isActive ? 'tf-graph-tab--active' : ''}`}
            onClick={() => onTabSelect?.(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              backgroundColor: isActive ? '#1a3050' : 'transparent',
              borderBottom: isActive ? '2px solid #4a6fa5' : '2px solid transparent',
              cursor: 'pointer',
              userSelect: 'none',
              minWidth: 0,
            }}
          >
            {tab.icon && <span style={{ fontSize: 10 }}>{tab.icon}</span>}
            <span
              style={{
                fontSize: 12,
                color: isActive ? '#c8d6e5' : '#8b9db8',
                fontWeight: isActive ? 500 : 400,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {tab.label}
            </span>
            {tab.modified && (
              <span style={{ color: '#f39c12', fontSize: 14, lineHeight: 1 }}>•</span>
            )}
            {tab.closable !== false && (
              <button
                className="tf-graph-tab__close"
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose?.(tab.id);
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
      })}

      {onNewTab && (
        <button
          className="tf-graph-tab-bar__new"
          onClick={onNewTab}
          title="New graph"
          type="button"
          style={{
            padding: '6px 10px',
            background: 'none',
            border: 'none',
            color: '#6b7f9e',
            cursor: 'pointer',
            fontSize: 16,
          }}
        >
          +
        </button>
      )}
    </div>
  );
};

GraphTabBar.displayName = 'GraphTabBar';

export default GraphTabBar;
