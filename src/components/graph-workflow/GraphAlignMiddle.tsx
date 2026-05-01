/**
 * @fileoverview GraphAlignMiddle — Align middle (vertical center) button for selected nodes.
 * Centers all selected nodes vertically on the same horizontal axis.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphAlignMiddleProps extends GraphComponentProps {
  /** Callback when alignment is triggered */
  onAlign: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
}

/**
 * GraphAlignMiddle — Align middle vertically button.
 *
 * Centers all selected nodes on the same horizontal center line.
 *
 * @example
 * <GraphAlignMiddle onAlign={() => alignSelected('middle')} disabled={selectedCount < 2} />
 */
export const GraphAlignMiddle: React.FC<GraphAlignMiddleProps> = ({
  className = '',
  style,
  onAlign,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      className={`tf-graph-align-middle ${disabled ? 'tf-graph-align-middle--disabled' : ''} ${className}`}
      onClick={onAlign}
      disabled={disabled}
      title="Align middle"
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
      —
    </button>
  );
};

GraphAlignMiddle.displayName = 'GraphAlignMiddle';
export default GraphAlignMiddle;
