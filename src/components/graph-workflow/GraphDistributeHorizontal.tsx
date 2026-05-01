/**
 * @fileoverview GraphDistributeHorizontal — Horizontal distribution button.
 * Evenly spaces selected nodes horizontally across their bounding span.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphDistributeHorizontalProps extends GraphComponentProps {
  /** Callback when distribution is triggered */
  onDistribute: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
}

/**
 * GraphDistributeHorizontal — Horizontal distribute button.
 *
 * Distributes selected nodes evenly along the horizontal axis
 * within the span from the leftmost to the rightmost node.
 *
 * @example
 * <GraphDistributeHorizontal
 *   onDistribute={() => distributeNodes('horizontal')}
 *   disabled={selectedNodes.length < 3}
 * />
 */
export const GraphDistributeHorizontal: React.FC<GraphDistributeHorizontalProps> = ({
  className = '',
  style,
  onDistribute,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      className={`tf-graph-distribute-horizontal ${disabled ? 'tf-graph-distribute-horizontal--disabled' : ''} ${className}`}
      onClick={onDistribute}
      disabled={disabled}
      title="Distribute horizontally"
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
      ⇹
    </button>
  );
};

GraphDistributeHorizontal.displayName = 'GraphDistributeHorizontal';
export default GraphDistributeHorizontal;
