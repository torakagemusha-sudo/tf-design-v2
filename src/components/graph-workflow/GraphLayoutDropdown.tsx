/**
 * @fileoverview GraphLayoutDropdown — Layout algorithm selector dropdown.
 * Allows the user to choose from available layout algorithms.
 */

import React, { useState, useRef, useEffect } from 'react';
import type { LayoutAlgorithm, GraphComponentProps } from './types';

export interface GraphLayoutDropdownProps extends GraphComponentProps {
  /** Currently selected layout algorithm */
  selected?: LayoutAlgorithm;
  /** Available layout algorithms */
  algorithms?: LayoutAlgorithm[];
  /** Algorithm display names */
  algorithmLabels?: Record<LayoutAlgorithm, string>;
  /** Callback when a layout is selected */
  onSelect: (algorithm: LayoutAlgorithm) => void;
}

const DEFAULT_ALGORITHMS: LayoutAlgorithm[] = [
  'hierarchical',
  'forceDirected',
  'circular',
  'grid',
  'tree',
  'dagre',
  'elk',
  'manual',
];

const DEFAULT_LABELS: Record<LayoutAlgorithm, string> = {
  hierarchical: 'Hierarchical',
  forceDirected: 'Force Directed',
  circular: 'Circular',
  grid: 'Grid',
  tree: 'Tree',
  dagre: 'Dagre',
  elk: 'ELK',
  manual: 'Manual',
};

/**
 * GraphLayoutDropdown — Layout algorithm selector.
 *
 * A dropdown menu for selecting the automatic layout algorithm
 * used to position nodes on the canvas.
 *
 * @example
 * <GraphLayoutDropdown
 *   selected="hierarchical"
 *   onSelect={(alg) => setLayoutAlgorithm(alg)}
 * />
 */
export const GraphLayoutDropdown: React.FC<GraphLayoutDropdownProps> = ({
  className = '',
  style,
  selected = 'hierarchical',
  algorithms = DEFAULT_ALGORITHMS,
  algorithmLabels = DEFAULT_LABELS,
  onSelect,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div
      ref={ref}
      className={`tf-graph-layout-dropdown ${open ? 'tf-graph-layout-dropdown--open' : ''} ${className}`}
      style={{ position: 'relative', display: 'inline-block', ...style }}
      {...rest}
    >
      <button
        className="tf-graph-layout-dropdown__trigger"
        onClick={() => setOpen(!open)}
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 10px',
          backgroundColor: 'rgba(16, 22, 36, 0.95)',
          border: '1px solid #2a3a4e',
          borderRadius: 6,
          color: '#c8d6e5',
          cursor: 'pointer',
          fontSize: 12,
        }}
      >
        <span>⬭</span>
        <span>{algorithmLabels[selected]}</span>
        <span style={{ marginLeft: 4, fontSize: 8 }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div
          className="tf-graph-layout-dropdown__menu"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: 4,
            minWidth: 160,
            backgroundColor: 'rgba(16, 22, 36, 0.98)',
            border: '1px solid #2a3a4e',
            borderRadius: 6,
            zIndex: 100,
            overflow: 'hidden',
          }}
        >
          {algorithms.map((alg) => (
            <button
              key={alg}
              className={`tf-graph-layout-dropdown__item ${alg === selected ? 'tf-graph-layout-dropdown__item--selected' : ''}`}
              onClick={() => {
                onSelect(alg);
                setOpen(false);
              }}
              type="button"
              style={{
                display: 'block',
                width: '100%',
                padding: '6px 12px',
                textAlign: 'left',
                background: alg === selected ? '#2a4a6f' : 'transparent',
                border: 'none',
                color: alg === selected ? '#c8d6e5' : '#8b9db8',
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              {algorithmLabels[alg]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

GraphLayoutDropdown.displayName = 'GraphLayoutDropdown';
export default GraphLayoutDropdown;
