/**
 * @fileoverview GraphDistributeVertical — Vertical distribution button.
 * Evenly spaces selected nodes vertically across their bounding span.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphDistributeVerticalProps extends GraphComponentProps {
  /** Callback when distribution is triggered */
  onDistribute: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
}

/**
 * GraphDistributeVertical — Vertical distribute button.
 *
 * Distributes selected nodes evenly along the vertical axis
 * within the span from the topmost to the bottommost node.
 *
 * @example
 * <GraphDistributeVertical
 *   onDistribute={() => distributeNodes('vertical')}
 *   disabled={selectedNodes.length < 3}
 * />
 */
export const GraphDistributeVertical: React.FC<GraphDistributeVerticalProps> = ({
  className = '',
  style,
  onDistribute,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      className={`tf-graph-distribute-vertical ${disabled ? 'tf-graph-distribute-vertical--disabled' : ''} ${className}`}
      onClick={onDistribute}
      disabled={disabled}
      title="Distribute vertically"
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
      ⇳
    </button>
  );
};

GraphDistributeVertical.displayName = 'GraphDistributeVertical';
export default GraphDistributeVertical;
