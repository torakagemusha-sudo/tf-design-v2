/**
 * @fileoverview GraphAlignmentTools — Alignment tools container for align/distribute operations.
 * Groups alignment and distribution buttons in a single toolbar.
 */

import React from 'react';
import type { ReactNode } from 'react';
import type { GraphComponentProps } from './types';

export interface GraphAlignmentToolsProps extends GraphComponentProps {
  /** Children (alignment buttons) */
  children?: ReactNode;
  /** Whether the tools are visible */
  visible?: boolean;
  /** Whether alignment is disabled (no selection) */
  disabled?: boolean;
  /** Callback for align left */
  onAlignLeft?: () => void;
  /** Callback for align center */
  onAlignCenter?: () => void;
  /** Callback for align right */
  onAlignRight?: () => void;
  /** Callback for align top */
  onAlignTop?: () => void;
  /** Callback for align middle */
  onAlignMiddle?: () => void;
  /** Callback for align bottom */
  onAlignBottom?: () => void;
  /** Callback for horizontal distribute */
  onDistributeHorizontal?: () => void;
  /** Callback for vertical distribute */
  onDistributeVertical?: () => void;
}

/**
 * GraphAlignmentTools — Alignment and distribution toolbar.
 *
 * A container component that groups alignment and distribution
 * buttons for arranging selected nodes on the canvas.
 *
 * @example
 * <GraphAlignmentTools
 *   onAlignLeft={() => alignSelected('left')}
 *   onAlignCenter={() => alignSelected('center')}
 *   onDistributeHorizontal={() => distributeSelected('horizontal')}
 * />
 */
export const GraphAlignmentTools: React.FC<GraphAlignmentToolsProps> = ({
  className = '',
  style,
  children,
  visible = true,
  disabled = false,
  onAlignLeft,
  onAlignCenter,
  onAlignRight,
  onAlignTop,
  onAlignMiddle,
  onAlignBottom,
  onDistributeHorizontal,
  onDistributeVertical,
  ...rest
}) => {
  if (!visible) return null;

  const btnStyle = (active?: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    backgroundColor: active ? '#2a4a6f' : 'transparent',
    border: '1px solid transparent',
    borderRadius: 4,
    color: disabled ? '#3a5274' : '#8b9db8',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: 12,
    padding: 0,
  });

  return (
    <div
      className={`tf-graph-alignment-tools ${disabled ? 'tf-graph-alignment-tools--disabled' : ''} ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 4,
        backgroundColor: 'rgba(16, 22, 36, 0.95)',
        border: '1px solid #2a3a4e',
        borderRadius: 6,
        zIndex: 50,
        ...style,
      }}
      {...rest}
    >
      {/* Alignment row */}
      <div style={{ display: 'flex', gap: 2 }}>
        <button onClick={onAlignLeft} disabled={disabled} title="Align left" type="button" style={btnStyle()}>
          ⇤
        </button>
        <button onClick={onAlignCenter} disabled={disabled} title="Align center" type="button" style={btnStyle()}>
          ⇋
        </button>
        <button onClick={onAlignRight} disabled={disabled} title="Align right" type="button" style={btnStyle()}>
          ⇥
        </button>
      </div>

      <div style={{ height: 1, backgroundColor: '#2a3a4e', margin: '2px 0' }} />

      <div style={{ display: 'flex', gap: 2 }}>
        <button onClick={onAlignTop} disabled={disabled} title="Align top" type="button" style={btnStyle()}>
          ⤒
        </button>
        <button onClick={onAlignMiddle} disabled={disabled} title="Align middle" type="button" style={btnStyle()}>
          ⇳
        </button>
        <button onClick={onAlignBottom} disabled={disabled} title="Align bottom" type="button" style={btnStyle()}>
          ⤓
        </button>
      </div>

      <div style={{ height: 1, backgroundColor: '#2a3a4e', margin: '2px 0' }} />

      {/* Distribution row */}
      <div style={{ display: 'flex', gap: 2 }}>
        <button onClick={onDistributeHorizontal} disabled={disabled} title="Distribute horizontally" type="button" style={btnStyle()}>
          ⇹
        </button>
        <button onClick={onDistributeVertical} disabled={disabled} title="Distribute vertically" type="button" style={btnStyle()}>
          ⇳
        </button>
      </div>

      {children}
    </div>
  );
};

GraphAlignmentTools.displayName = 'GraphAlignmentTools';

export default GraphAlignmentTools;
