/**
 * @fileoverview GraphSpacingEqual — Equal spacing button for selected nodes.
 * Applies equal spacing between selected nodes in a given direction.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphSpacingEqualProps extends GraphComponentProps {
  /** Callback when equal spacing is triggered */
  onApply: () => void;
  /** Direction of spacing */
  direction?: 'horizontal' | 'vertical';
  /** Whether the button is disabled */
  disabled?: boolean;
}

/**
 * GraphSpacingEqual — Equal spacing button.
 *
 * Applies equal spacing between selected nodes either horizontally
 * or vertically.
 *
 * @example
 * <GraphSpacingEqual
 *   direction="horizontal"
 *   onApply={() => applyEqualSpacing('horizontal')}
 *   disabled={selectedCount < 3}
 * />
 */
export const GraphSpacingEqual: React.FC<GraphSpacingEqualProps> = ({
  className = '',
  style,
  onApply,
  direction = 'horizontal',
  disabled = false,
  ...rest
}) => {
  return (
    <button
      className={`tf-graph-spacing-equal tf-graph-spacing-equal--${direction} ${disabled ? 'tf-graph-spacing-equal--disabled' : ''} ${className}`}
      onClick={onApply}
      disabled={disabled}
      title={`Equal ${direction} spacing`}
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
        fontSize: direction === 'horizontal' ? 14 : 12,
        ...style,
      }}
      {...rest}
    >
      {direction === 'horizontal' ? '⇹' : '⇳'}
    </button>
  );
};

GraphSpacingEqual.displayName = 'GraphSpacingEqual';
export default GraphSpacingEqual;
