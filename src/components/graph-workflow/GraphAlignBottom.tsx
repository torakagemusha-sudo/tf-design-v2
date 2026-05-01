/**
 * @fileoverview GraphAlignBottom — Align bottom button for selected nodes.
 * Aligns all selected nodes to the bottom edge of the bottommost node.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphAlignBottomProps extends GraphComponentProps {
  /** Callback when alignment is triggered */
  onAlign: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
}

/**
 * GraphAlignBottom — Align bottom button.
 *
 * Aligns all selected nodes to the bottom edge of the bottommost
 * selected node.
 *
 * @example
 * <GraphAlignBottom onAlign={() => alignSelected('bottom')} disabled={selectedCount < 2} />
 */
export const GraphAlignBottom: React.FC<GraphAlignBottomProps> = ({
  className = '',
  style,
  onAlign,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      className={`tf-graph-align-bottom ${disabled ? 'tf-graph-align-bottom--disabled' : ''} ${className}`}
      onClick={onAlign}
      disabled={disabled}
      title="Align bottom"
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
      ⤓
    </button>
  );
};

GraphAlignBottom.displayName = 'GraphAlignBottom';
export default GraphAlignBottom;
