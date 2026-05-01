/**
 * @fileoverview GraphEdgeCurvature — Curvature control for bezier edges.
 * Adjusts the curvature amount of a bezier curve edge.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphEdgeCurvatureProps extends GraphComponentProps {
  /** Current curvature value (0 = straight, higher = more curved) */
  curvature: number;
  /** Whether the control is visible */
  visible?: boolean;
  /** Callback when curvature changes */
  onChange: (curvature: number) => void;
  /** Minimum curvature */
  min?: number;
  /** Maximum curvature */
  max?: number;
  /** Step increment */
  step?: number;
}

/**
 * GraphEdgeCurvature — Edge curvature control.
 *
 * A slider control for adjusting the curvature of bezier curve
 * edges. Higher values produce more pronounced curves.
 *
 * @example
 * <GraphEdgeCurvature
 *   curvature={0.3}
 *   onChange={(c) => setEdgeCurvature(c)}
 *   min={0}
 *   max={1}
 *   step={0.05}
 * />
 */
export const GraphEdgeCurvature: React.FC<GraphEdgeCurvatureProps> = ({
  className = '',
  style,
  curvature,
  visible = true,
  onChange,
  min = 0,
  max = 1,
  step = 0.05,
  ...rest
}) => {
  if (!visible) return null;

  return (
    <div
      className={`tf-graph-edge-curvature ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '4px 8px',
        backgroundColor: 'rgba(16, 22, 36, 0.95)',
        border: '1px solid #2a3a4e',
        borderRadius: 4,
        ...style,
      }}
      {...rest}
    >
      <span style={{ fontSize: 10, color: '#6b7f9e', whiteSpace: 'nowrap' }}>Curve</span>
      <input
        className="tf-graph-edge-curvature__slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={curvature}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: 80, accentColor: '#4a6fa5' }}
      />
      <span style={{ fontSize: 10, color: '#c8d6e5', minWidth: 32, textAlign: 'right' }}>
        {curvature.toFixed(2)}
      </span>
    </div>
  );
};

GraphEdgeCurvature.displayName = 'GraphEdgeCurvature';
export default GraphEdgeCurvature;
