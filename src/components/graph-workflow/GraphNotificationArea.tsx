/**
 * @fileoverview GraphNotificationArea — Notification stack for graph operations.
 * Displays transient toast notifications for graph actions and events.
 */

import React, { useEffect, useState } from 'react';
import type { GraphNotification, GraphComponentProps } from './types';

export interface GraphNotificationAreaProps extends GraphComponentProps {
  /** Active notifications */
  notifications: GraphNotification[];
  /** Callback when a notification is dismissed */
  onDismiss: (notificationId: string) => void;
  /** Maximum number of visible notifications */
  maxVisible?: number;
  /** Position on screen */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const TYPE_COLORS: Record<GraphNotification['type'], { bg: string; border: string; icon: string }> = {
  success: { bg: 'rgba(46, 204, 113, 0.1)', border: '#2a5a3a', icon: '✓' },
  error: { bg: 'rgba(231, 76, 60, 0.1)', border: '#5a2a2a', icon: '✕' },
  warning: { bg: 'rgba(243, 156, 18, 0.1)', border: '#5a4a1a', icon: '!' },
  info: { bg: 'rgba(52, 152, 219, 0.1)', border: '#1a3a5a', icon: 'i' },
};

/**
 * GraphNotificationArea — Notification stack.
 *
 * Displays transient toast notifications that auto-dismiss after
 * a configured duration. Supports success, error, warning, and
 * info notification types.
 *
 * @example
 * <GraphNotificationArea
 *   notifications={[
 *     { id: '1', type: 'success', message: 'Graph saved', timestamp: Date.now() },
 *   ]}
 *   onDismiss={(id) => removeNotification(id)}
 * />
 */
export const GraphNotificationArea: React.FC<GraphNotificationAreaProps> = ({
  className = '',
  style,
  notifications,
  onDismiss,
  maxVisible = 5,
  position = 'top-right',
  ...rest
}) => {
  const [dismissing, setDismissing] = useState<Set<string>>(new Set());

  useEffect(() => {
    notifications.forEach((n) => {
      if (n.duration && n.duration > 0) {
        const timer = setTimeout(() => {
          setDismissing((prev) => new Set(prev).add(n.id));
          setTimeout(() => onDismiss(n.id), 300);
        }, n.duration);
        return () => clearTimeout(timer);
      }
    });
  }, [notifications, onDismiss]);

  const visible = notifications.slice(-maxVisible);
  if (visible.length === 0) return null;

  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 500,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 12,
  };

  switch (position) {
    case 'top-right':
      positionStyle.top = 0;
      positionStyle.right = 0;
      break;
    case 'top-left':
      positionStyle.top = 0;
      positionStyle.left = 0;
      break;
    case 'bottom-right':
      positionStyle.bottom = 0;
      positionStyle.right = 0;
      break;
    case 'bottom-left':
      positionStyle.bottom = 0;
      positionStyle.left = 0;
      break;
  }

  return (
    <div
      className={`tf-graph-notification-area tf-graph-notification-area--${position} ${className}`}
      style={{ ...positionStyle, ...style }}
      {...rest}
    >
      {visible.map((notification) => {
        const config = TYPE_COLORS[notification.type];
        const isDismissing = dismissing.has(notification.id);

        return (
          <div
            key={notification.id}
            className={`tf-graph-notification tf-graph-notification--${notification.type}`}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              padding: '8px 12px',
              minWidth: 220,
              maxWidth: 320,
              backgroundColor: 'rgba(16, 22, 36, 0.98)',
              border: `1px solid ${config.border}`,
              borderLeft: `3px solid ${config.border}`,
              borderRadius: 4,
              opacity: isDismissing ? 0 : 1,
              transform: isDismissing ? 'translateX(20px)' : 'translateX(0)',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            <span style={{ fontSize: 12, color: config.border, marginTop: 1 }}>{config.icon}</span>
            <span style={{ flex: 1, fontSize: 11, color: '#c8d6e5' }}>{notification.message}</span>
            {notification.dismissible !== false && (
              <button
                className="tf-graph-notification__dismiss"
                onClick={() => onDismiss(notification.id)}
                type="button"
                style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 10, padding: 0 }}
              >
                ✕
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

GraphNotificationArea.displayName = 'GraphNotificationArea';
export default GraphNotificationArea;
