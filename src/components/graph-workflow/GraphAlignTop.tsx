/**
 * @fileoverview GraphAlignTop — Align top button for selected nodes.
 * Aligns all selected nodes to the top edge of the topmost node.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphAlignTopProps extends GraphComponentProps {
  /** Callback when alignment is triggered */
  onAlign: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
}

/**
 * GraphAlignTop — Align top button.
 *
 * Aligns all selected nodes to the top edge of the topmost
 * selected node.
 *
 * @example
 * <GraphAlignTop onAlign={() => alignSelected('top')} disabled={selectedCount < 2} />
 */
export const GraphAlignTop: React.FC<GraphAlignTopProps> = ({
  className = '',
  style,
  onAlign,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      className={`tf-graph-align-top ${disabled ? 'tf-graph-align-top--disabled' : ''} ${className}`}
      onClick={onAlign}
      disabled={disabled}
      title="Align top"
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
      ⤒
    </button>
  );
};

GraphAlignTop.displayName = 'GraphAlignTop';
export default GraphAlignTop;
