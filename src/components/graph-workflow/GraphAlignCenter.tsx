/**
 * @fileoverview GraphAlignCenter — Align center (horizontal) button for selected nodes.
 * Centers all selected nodes horizontally on the same vertical axis.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphAlignCenterProps extends GraphComponentProps {
  /** Callback when alignment is triggered */
  onAlign: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
}

/**
 * GraphAlignCenter — Align center horizontally button.
 *
 * Centers all selected nodes on the same vertical center line.
 *
 * @example
 * <GraphAlignCenter onAlign={() => alignSelected('center')} disabled={selectedCount < 2} />
 */
export const GraphAlignCenter: React.FC<GraphAlignCenterProps> = ({
  className = '',
  style,
  onAlign,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      className={`tf-graph-align-center ${disabled ? 'tf-graph-align-center--disabled' : ''} ${className}`}
      onClick={onAlign}
      disabled={disabled}
      title="Align center"
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
      ⇋
    </button>
  );
};

GraphAlignCenter.displayName = 'GraphAlignCenter';
export default GraphAlignCenter;
