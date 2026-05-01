/**
 * @fileoverview GraphToolbar — Graph editing toolbar with tool selection.
 * Provides buttons for switching between editing tools (select, pan, lasso, etc.).
 */

import React from 'react';
import type { ReactNode } from 'react';
import type { ToolType, GraphComponentProps } from './types';

export interface GraphToolbarProps extends GraphComponentProps {
  /** Currently active tool */
  activeTool?: ToolType;
  /** Available tools to display */
  tools?: ToolType[];
  /** Custom tool button renderer */
  renderToolButton?: (tool: ToolType, isActive: boolean) => ReactNode;
  /** Callback when a tool is selected */
  onToolChange?: (tool: ToolType) => void;
  /** Orientation of the toolbar */
  orientation?: 'horizontal' | 'vertical';
  /** Whether the toolbar is visible */
  visible?: boolean;
  /** Toolbar position */
  position?: 'top' | 'left';
}

const DEFAULT_TOOLS: ToolType[] = [
  'select',
  'pan',
  'lasso',
  'connect',
  'delete',
  'comment',
  'bookmark',
];

const TOOL_ICONS: Record<ToolType, string> = {
  select: '↖',
  pan: '✋',
  lasso: '⬡',
  connect: '→',
  delete: '🗑',
  comment: '💬',
  bookmark: '🔖',
};

const TOOL_LABELS: Record<ToolType, string> = {
  select: 'Select',
  pan: 'Pan',
  lasso: 'Lasso',
  connect: 'Connect',
  delete: 'Delete',
  comment: 'Comment',
  bookmark: 'Bookmark',
};

/**
 * GraphToolbar — Graph editing toolbar.
 *
 * Provides a set of toggle buttons for switching between graph
 * editing tools: select, pan, lasso select, connect, delete, etc.
 *
 * @example
 * <GraphToolbar
 *   activeTool="select"
 *   onToolChange={(tool) => setActiveTool(tool)}
 * />
 */
export const GraphToolbar: React.FC<GraphToolbarProps> = ({
  className = '',
  style,
  activeTool = 'select',
  tools = DEFAULT_TOOLS,
  renderToolButton,
  onToolChange,
  orientation = 'vertical',
  visible = true,
  position = 'left',
  ...rest
}) => {
  if (!visible) return null;

  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      className={`tf-graph-toolbar tf-graph-toolbar--${orientation} tf-graph-toolbar--${position} ${className}`}
      style={{
        position: 'absolute',
        [position === 'left' ? 'left' : 'top']: 12,
        [position === 'left' ? 'top' : 'left']: 12,
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        gap: 2,
        padding: 4,
        backgroundColor: 'rgba(16, 22, 36, 0.95)',
        border: '1px solid #2a3a4e',
        borderRadius: 6,
        zIndex: 50,
        ...style,
      }}
      data-testid="graph-toolbar"
      {...rest}
    >
      {tools.map((tool) => {
        const isActive = activeTool === tool;
        if (renderToolButton) {
          return (
            <React.Fragment key={tool}>
              {renderToolButton(tool, isActive)}
            </React.Fragment>
          );
        }
        return (
          <button
            key={tool}
            className={`tf-graph-toolbar__button ${isActive ? 'tf-graph-toolbar__button--active' : ''}`}
            onClick={() => onToolChange?.(tool)}
            title={TOOL_LABELS[tool]}
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              backgroundColor: isActive ? '#2a4a6f' : 'transparent',
              border: isActive ? '1px solid #4a6fa5' : '1px solid transparent',
              borderRadius: 4,
              color: isActive ? '#c8d6e5' : '#6b7f9e',
              cursor: 'pointer',
              fontSize: 14,
              transition: 'all 0.15s ease',
            }}
          >
            {TOOL_ICONS[tool]}
          </button>
        );
      })}
    </div>
  );
};

GraphToolbar.displayName = 'GraphToolbar';

export default GraphToolbar;
