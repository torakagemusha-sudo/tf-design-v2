/**
 * @fileoverview GraphAlignLeft — Align left button for selected nodes.
 * Aligns all selected nodes to the left edge of the leftmost node.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphAlignLeftProps extends GraphComponentProps {
  /** Callback when alignment is triggered */
  onAlign: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
}

/**
 * GraphAlignLeft — Align left button.
 *
 * Aligns all selected nodes to the left edge of the leftmost
 * selected node.
 *
 * @example
 * <GraphAlignLeft onAlign={() => alignSelected('left')} disabled={selectedCount < 2} />
 */
export const GraphAlignLeft: React.FC<GraphAlignLeftProps> = ({
  className = '',
  style,
  onAlign,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      className={`tf-graph-align-left ${disabled ? 'tf-graph-align-left--disabled' : ''} ${className}`}
      onClick={onAlign}
      disabled={disabled}
      title="Align left"
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
      ⇤
    </button>
  );
};

GraphAlignLeft.displayName = 'GraphAlignLeft';
export default GraphAlignLeft;
