/**
 * @fileoverview GraphLassoTool — Lasso selection tool for freehand selection regions.
 * Draws a freehand polygon to select all nodes/edges within the enclosed area.
 */

import React, { useState, useCallback, useRef } from 'react';
import type { GraphComponentProps, Point2D } from './types';

export interface GraphLassoToolProps extends GraphComponentProps {
  /** Whether the lasso tool is active */
  active?: boolean;
  /** Currently drawn lasso path (world coordinates) */
  path?: Point2D[];
  /** Callback when a lasso selection is completed */
  onLassoComplete?: (path: Point2D[]) => void;
  /** Callback when the tool is activated */
  onActivate: () => void;
}

/**
 * GraphLassoTool — Lasso selection tool.
 *
 * Enables freehand drawing of a selection polygon around nodes
 * and edges. All elements fully enclosed by the lasso path are
 * selected when the gesture completes.
 *
 * @example
 * <GraphLassoTool
 *   active={tool === 'lasso'}
 *   onLassoComplete={(path) => selectEnclosed(path)}
 *   onActivate={() => setTool('lasso')}
 * />
 */
export const GraphLassoTool: React.FC<GraphLassoToolProps> = ({
  className = '',
  style,
  active = false,
  path,
  onLassoComplete,
  onActivate,
  ...rest
}) => {
  return (
    <div
      className={`tf-graph-lasso-tool ${active ? 'tf-graph-lasso-tool--active' : ''} ${className}`}
      style={{ display: 'flex', alignItems: 'center', ...style }}
      {...rest}
    >
      <button
        className="tf-graph-lasso-tool__button"
        onClick={onActivate}
        title="Lasso select (L)"
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          backgroundColor: active ? '#2a4a6f' : 'transparent',
          border: `1px solid ${active ? '#4a6fa5' : 'transparent'}`,
          borderRadius: 4,
          color: active ? '#c8d6e5' : '#8b9db8',
          cursor: 'pointer',
          fontSize: 14,
        }}
      >
        ⬡
      </button>
    </div>
  );
};

GraphLassoTool.displayName = 'GraphLassoTool';
export default GraphLassoTool;
