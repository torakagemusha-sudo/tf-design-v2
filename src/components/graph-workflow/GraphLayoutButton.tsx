/**
 * @fileoverview GraphLayoutButton — Auto-layout trigger button.
 * Re-runs the layout algorithm to reposition all nodes automatically.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphLayoutButtonProps extends GraphComponentProps {
  /** Whether a layout is currently running */
  layoutInProgress?: boolean;
  /** Current layout algorithm name */
  layoutName?: string;
  /** Callback when layout is triggered */
  onLayout: () => void;
  /** Tooltip text */
  tooltip?: string;
}

/**
 * GraphLayoutButton — Auto-layout trigger button.
 *
 * A button that triggers the automatic layout algorithm to
 * reposition all nodes according to the configured layout rules.
 *
 * @example
 * <GraphLayoutButton
 *   layoutName="Hierarchical"
 *   onLayout={() => runAutoLayout()}
 * />
 */
export const GraphLayoutButton: React.FC<GraphLayoutButtonProps> = ({
  className = '',
  style,
  layoutInProgress = false,
  layoutName = 'Auto',
  onLayout,
  tooltip = 'Auto-layout (Ctrl+Shift+L)',
  ...rest
}) => {
  return (
    <button
      className={`tf-graph-layout-button ${layoutInProgress ? 'tf-graph-layout-button--running' : ''} ${className}`}
      onClick={onLayout}
      disabled={layoutInProgress}
      title={tooltip}
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        backgroundColor: layoutInProgress ? '#1a3a3a' : 'rgba(16, 22, 36, 0.95)',
        border: '1px solid #2a3a4e',
        borderRadius: 6,
        color: layoutInProgress ? '#2ecc71' : '#8b9db8',
        cursor: layoutInProgress ? 'wait' : 'pointer',
        fontSize: 12,
        ...style,
      }}
      {...rest}
    >
      <span className="tf-graph-layout-button__icon" style={{ fontSize: 14 }}>
        {layoutInProgress ? '⟳' : '⬭'}
      </span>
      <span className="tf-graph-layout-button__label">{layoutName}</span>
    </button>
  );
};

GraphLayoutButton.displayName = 'GraphLayoutButton';
export default GraphLayoutButton;
