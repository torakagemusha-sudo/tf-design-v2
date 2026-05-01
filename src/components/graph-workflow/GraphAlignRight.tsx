/**
 * @fileoverview GraphAlignRight — Align right button for selected nodes.
 * Aligns all selected nodes to the right edge of the rightmost node.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphAlignRightProps extends GraphComponentProps {
  /** Callback when alignment is triggered */
  onAlign: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
}

/**
 * GraphAlignRight — Align right button.
 *
 * Aligns all selected nodes to the right edge of the rightmost
 * selected node.
 *
 * @example
 * <GraphAlignRight onAlign={() => alignSelected('right')} disabled={selectedCount < 2} />
 */
export const GraphAlignRight: React.FC<GraphAlignRightProps> = ({
  className = '',
  style,
  onAlign,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      className={`tf-graph-align-right ${disabled ? 'tf-graph-align-right--disabled' : ''} ${className}`}
      onClick={onAlign}
      disabled={disabled}
      title="Align right"
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        borderRadius: 4,
        color: disabled ? '#3a5274' : '#8b9db8',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: 14,
        ...style,
      }}
      {...rest}
    >
      ⇥
    </button>
  );
};

GraphAlignRight.displayName = 'GraphAlignRight';
export default GraphAlignRight;
