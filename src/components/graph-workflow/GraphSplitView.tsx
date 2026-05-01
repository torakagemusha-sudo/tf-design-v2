/**
 * @fileoverview GraphSplitView — Split graph view for side-by-side editing.
 * Divides the canvas into two resizable panes viewing different graph regions.
 */

import React, { useState, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import type { GraphComponentProps } from './types';

export interface GraphSplitViewProps extends GraphComponentProps {
  /** Content for the left/top pane */
  primaryPane: ReactNode;
  /** Content for the right/bottom pane */
  secondaryPane: ReactNode;
  /** Split direction */
  direction?: 'horizontal' | 'vertical';
  /** Initial split percentage (0-100) */
  splitPercent?: number;
  /** Minimum pane size percentage */
  minPaneSize?: number;
  /** Whether the split view is active */
  active?: boolean;
  /** Callback when split changes */
  onSplitChange?: (percent: number) => void;
}

/**
 * GraphSplitView — Split graph view.
 *
 * Divides the graph editor into two resizable panes, allowing
 * side-by-side viewing of different regions or graphs.
 *
 * @example
 * <GraphSplitView
 *   primaryPane={<GraphCanvas {...propsA} />}
 *   secondaryPane={<GraphCanvas {...propsB} />}
 *   direction="horizontal"
 *   splitPercent={50}
 * />
 */
export const GraphSplitView: React.FC<GraphSplitViewProps> = ({
  className = '',
  style,
  primaryPane,
  secondaryPane,
  direction = 'horizontal',
  splitPercent = 50,
  minPaneSize = 15,
  active = true,
  onSplitChange,
  ...rest
}) => {
  const [percent, setPercent] = useState(splitPercent);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isHorizontal = direction === 'horizontal';

  const handleMouseDown = useCallback(() => {
    setDragging(true);

    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = isHorizontal ? rect.width : rect.height;
      const offset = isHorizontal ? e.clientX - rect.left : e.clientY - rect.top;
      const newPercent = Math.max(minPaneSize, Math.min(100 - minPaneSize, (offset / total) * 100));
      setPercent(newPercent);
      onSplitChange?.(newPercent);
    };

    const handleUp = () => {
      setDragging(false);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
  }, [isHorizontal, minPaneSize, onSplitChange]);

  if (!active) {
    return <>{primaryPane}</>;
  }

  return (
    <div
      ref={containerRef}
      className={`tf-graph-split-view tf-graph-split-view--${direction} ${dragging ? 'tf-graph-split-view--dragging' : ''} ${className}`}
      style={{
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        width: '100%',
        height: '100%',
        ...style,
      }}
      {...rest}
    >
      <div
        className="tf-graph-split-view__primary"
        style={{ [isHorizontal ? 'width' : 'height']: `${percent}%`, overflow: 'hidden' }}
      >
        {primaryPane}
      </div>

      <div
        className="tf-graph-split-view__divider"
        onMouseDown={handleMouseDown}
        style={{
          [isHorizontal ? 'width' : 'height']: 4,
          [isHorizontal ? 'height' : 'width']: '100%',
          backgroundColor: dragging ? '#4a6fa5' : '#2a3a4e',
          cursor: isHorizontal ? 'col-resize' : 'row-resize',
          flexShrink: 0,
        }}
      />

      <div
        className="tf-graph-split-view__secondary"
        style={{ [isHorizontal ? 'width' : 'height']: `${100 - percent}%`, overflow: 'hidden' }}
      >
        {secondaryPane}
      </div>
    </div>
  );
};

GraphSplitView.displayName = 'GraphSplitView';
export default GraphSplitView;
