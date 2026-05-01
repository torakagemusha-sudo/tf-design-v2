/**
 * @fileoverview GraphEdgeLabel — Editable label on a graph edge.
 * Displays and allows editing of text labels on connections.
 */

import React, { useState } from 'react';
import type { GraphComponentProps } from './types';

export interface GraphEdgeLabelProps extends GraphComponentProps {
  /** Label text */
  text: string;
  /** Screen position for the label */
  position: { x: number; y: number };
  /** Whether the label is being edited */
  editing?: boolean;
  /** Background color for the label */
  backgroundColor?: string;
  /** Callback when the label text changes */
  onChange?: (text: string) => void;
  /** Callback when edit mode is toggled */
  onEditToggle?: () => void;
}

/**
 * GraphEdgeLabel — Edge label.
 *
 * A text label positioned along a graph edge. Supports inline
 * editing when double-clicked.
 *
 * @example
 * <GraphEdgeLabel
 *   text="YES"
 *   position={{ x: 200, y: 150 }}
 *   onChange={(text) => updateEdgeLabel(text)}
 * />
 */
export const GraphEdgeLabel: React.FC<GraphEdgeLabelProps> = ({
  className = '',
  style,
  text,
  position,
  editing = false,
  backgroundColor = 'rgba(16, 22, 36, 0.9)',
  onChange,
  onEditToggle,
  ...rest
}) => {
  const [editText, setEditText] = useState(text);

  if (editing) {
    return (
      <foreignObject x={position.x - 50} y={position.y - 12} width={100} height={24}>
        <input
          className="tf-graph-edge-label__input"
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={() => onChange?.(editText)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onChange?.(editText);
          }}
          autoFocus
          style={{
            width: '100%',
            padding: '2px 6px',
            background: backgroundColor,
            border: '1px solid #4a6fa5',
            borderRadius: 3,
            color: '#c8d6e5',
            fontSize: 11,
            textAlign: 'center',
            outline: 'none',
          }}
        />
      </foreignObject>
    );
  }

  return (
    <g
      className={`tf-graph-edge-label ${className}`}
      transform={`translate(${position.x}, ${position.y})`}
      onDoubleClick={onEditToggle}
      style={{ cursor: 'text' }}
      {...rest}
    >
      <rect
        x={-text.length * 3.5 - 6}
        y={-10}
        width={text.length * 7 + 12}
        height={20}
        rx={4}
        fill={backgroundColor}
        stroke="#2a3a4e"
        strokeWidth={0.5}
      />
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#c8d6e5"
        fontSize={11}
        fontWeight={500}
      >
        {text}
      </text>
    </g>
  );
};

GraphEdgeLabel.displayName = 'GraphEdgeLabel';
export default GraphEdgeLabel;
