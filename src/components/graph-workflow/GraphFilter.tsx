/**
 * @fileoverview GraphFilter — Node/edge filter panel for filtering by type and properties.
 * Toggle visibility of specific node types, edge types, or status values.
 */

import React, { useState } from 'react';
import type { GraphComponentProps } from './types';

export interface GraphFilterState {
  nodeTypes: Record<string, boolean>;
  edgeTypes: Record<string, boolean>;
  statuses: Record<string, boolean>;
  search: string;
}

export interface GraphFilterProps extends GraphComponentProps {
  /** Available node types to filter */
  nodeTypes?: string[];
  /** Available edge types to filter */
  edgeTypes?: string[];
  /** Available status values to filter */
  statuses?: string[];
  /** Current filter state */
  filter?: GraphFilterState;
  /** Callback when filter changes */
  onFilterChange?: (filter: GraphFilterState) => void;
  /** Whether the filter panel is visible */
  visible?: boolean;
  /** Callback to toggle visibility */
  onToggleVisible?: () => void;
}

/**
 * GraphFilter — Node/edge filter panel.
 *
 * Provides toggle switches for showing/hiding specific node types,
 * edge types, and status values on the graph canvas.
 *
 * @example
 * <GraphFilter
 *   nodeTypes={['process', 'decision', 'start', 'end']}
 *   onFilterChange={(f) => applyFilter(f)}
 * />
 */
export const GraphFilter: React.FC<GraphFilterProps> = ({
  className = '',
  style,
  nodeTypes = [],
  edgeTypes = [],
  statuses = [],
  filter,
  onFilterChange,
  visible = false,
  onToggleVisible,
  ...rest
}) => {
  const [localFilter, setLocalFilter] = useState<GraphFilterState>({
    nodeTypes: Object.fromEntries(nodeTypes.map((t) => [t, true])),
    edgeTypes: Object.fromEntries(edgeTypes.map((t) => [t, true])),
    statuses: Object.fromEntries(statuses.map((s) => [s, true])),
    search: '',
  });

  const currentFilter = filter ?? localFilter;

  const updateFilter = (partial: Partial<GraphFilterState>) => {
    const next = { ...currentFilter, ...partial };
    if (!filter) setLocalFilter(next);
    onFilterChange?.(next);
  };

  const toggleType = (category: 'nodeTypes' | 'edgeTypes' | 'statuses', key: string) => {
    updateFilter({
      [category]: { ...currentFilter[category], [key]: !currentFilter[category][key] },
    });
  };

  return (
    <div className={`tf-graph-filter ${className}`} style={{ ...style }} {...rest}>
      <button
        className="tf-graph-filter__toggle"
        onClick={onToggleVisible}
        title="Filter"
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          backgroundColor: visible ? '#2a4a6f' : 'rgba(16, 22, 36, 0.95)',
          border: `1px solid ${visible ? '#4a6fa5' : '#2a3a4e'}`,
          borderRadius: 6,
          color: visible ? '#c8d6e5' : '#8b9db8',
          cursor: 'pointer',
          fontSize: 14,
        }}
      >
        🔽
      </button>

      {visible && (
        <div
          className="tf-graph-filter__panel"
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            marginTop: 4,
            width: 200,
            padding: 12,
            backgroundColor: 'rgba(16, 22, 36, 0.98)',
            border: '1px solid #2a3a4e',
            borderRadius: 6,
            zIndex: 100,
          }}
        >
          {nodeTypes.length > 0 && (
            <div className="tf-graph-filter__section" style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#6b7f9e', marginBottom: 6, textTransform: 'uppercase' }}>
                Node Types
              </div>
              {nodeTypes.map((type) => (
                <label
                  key={type}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '2px 0',
                    cursor: 'pointer',
                    fontSize: 12,
                    color: '#c8d6e5',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={currentFilter.nodeTypes[type] ?? true}
                    onChange={() => toggleType('nodeTypes', type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          )}

          {edgeTypes.length > 0 && (
            <div className="tf-graph-filter__section" style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#6b7f9e', marginBottom: 6, textTransform: 'uppercase' }}>
                Edge Types
              </div>
              {edgeTypes.map((type) => (
                <label
                  key={type}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '2px 0',
                    cursor: 'pointer',
                    fontSize: 12,
                    color: '#c8d6e5',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={currentFilter.edgeTypes[type] ?? true}
                    onChange={() => toggleType('edgeTypes', type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          )}

          {statuses.length > 0 && (
            <div className="tf-graph-filter__section">
              <div style={{ fontSize: 10, fontWeight: 700, color: '#6b7f9e', marginBottom: 6, textTransform: 'uppercase' }}>
                Status
              </div>
              {statuses.map((status) => (
                <label
                  key={status}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '2px 0',
                    cursor: 'pointer',
                    fontSize: 12,
                    color: '#c8d6e5',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={currentFilter.statuses[status] ?? true}
                    onChange={() => toggleType('statuses', status)}
                  />
                  {status}
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

GraphFilter.displayName = 'GraphFilter';
export default GraphFilter;
