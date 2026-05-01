/**
 * @fileoverview GraphFitButton — Fit-to-screen button resetting view to show all nodes.
 * Centers and zooms the viewport so all content is visible.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphFitButtonProps extends GraphComponentProps {
  /** Callback when fit is triggered */
  onFit: () => void;
  /** Button tooltip text */
  tooltip?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
}

/**
 * GraphFitButton — Fit to screen button.
 *
 * A single button that centers and scales the viewport to make
 * all graph content visible within the canvas bounds.
 *
 * @example
 * <GraphFitButton onFit={() => canvas.fitToContent()} />
 */
export const GraphFitButton: React.FC<GraphFitButtonProps> = ({
  className = '',
  style,
  onFit,
  tooltip = 'Fit to screen',
  disabled = false,
  ...rest
}) => {
  return (
    <button
      className={`tf-graph-fit-button ${className}`}
      onClick={onFit}
      disabled={disabled}
      title={tooltip}
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        backgroundColor: 'rgba(16, 22, 36, 0.95)',
        border: '1px solid #2a3a4e',
        borderRadius: 6,
        color: disabled ? '#3a5274' : '#8b9db8',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: 14,
        ...style,
      }}
      {...rest}
    >
      ⧉
    </button>
  );
};

GraphFitButton.displayName = 'GraphFitButton';
export default GraphFitButton;
