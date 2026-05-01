/**
 * @fileoverview GraphPortValidator — Port connection validator with visual feedback.
 * Shows whether a connection between two ports is valid.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface PortValidationResult {
  valid: boolean;
  message?: string;
  rule?: string;
}

export interface GraphPortValidatorProps extends GraphComponentProps {
  /** Validation result */
  result: PortValidationResult;
  /** Source port position */
  sourcePos: { x: number; y: number };
  /** Target port position */
  targetPos: { x: number; y: number };
  /** Whether validation is active (during drag) */
  active?: boolean;
}

/**
 * GraphPortValidator — Port connection validator.
 *
 * Displays a validation indicator during connection drag operations,
 * showing whether the proposed connection between two ports is valid.
 *
 * @example
 * <GraphPortValidator
 *   result={{ valid: false, message: 'Type mismatch', rule: 'type-compatible' }}
 *   sourcePos={{ x: 100, y: 200 }}
 *   targetPos={{ x: 300, y: 200 }}
 *   active={isDraggingConnection}
 * />
 */
export const GraphPortValidator: React.FC<GraphPortValidatorProps> = ({
  className = '',
  style,
  result,
  sourcePos,
  targetPos,
  active = false,
  ...rest
}) => {
  if (!active) return null;

  const midX = (sourcePos.x + targetPos.x) / 2;
  const midY = (sourcePos.y + targetPos.y) / 2;

  return (
    <div
      className={`tf-graph-port-validator ${result.valid ? 'tf-graph-port-validator--valid' : 'tf-graph-port-validator--invalid'} ${className}`}
      style={{
        position: 'absolute',
        left: midX - 60,
        top: midY - 20,
        width: 120,
        padding: '4px 8px',
        backgroundColor: result.valid ? 'rgba(46, 204, 113, 0.2)' : 'rgba(231, 76, 60, 0.2)',
        border: `1px solid ${result.valid ? '#2ecc71' : '#e74c3c'}`,
        borderRadius: 4,
        zIndex: 100,
        textAlign: 'center',
        pointerEvents: 'none',
        ...style,
      }}
      {...rest}
    >
      <span style={{ fontSize: 10, fontWeight: 600, color: result.valid ? '#2ecc71' : '#e74c3c' }}>
        {result.valid ? '✓ Valid' : `✕ ${result.message || 'Invalid'}`}
      </span>
    </div>
  );
};

GraphPortValidator.displayName = 'GraphPortValidator';
export default GraphPortValidator;
