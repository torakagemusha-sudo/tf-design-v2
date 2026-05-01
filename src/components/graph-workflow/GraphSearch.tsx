/**
 * @fileoverview GraphSearch — Node/edge search within the graph.
 * Provides search input to find and navigate to specific graph elements.
 */

import React, { useState, useCallback, useRef } from 'react';
import type { GraphNodeData, GraphEdgeData, GraphComponentProps } from './types';

export interface GraphSearchProps extends GraphComponentProps {
  /** All searchable nodes */
  nodes: GraphNodeData[];
  /** All searchable edges */
  edges?: GraphEdgeData[];
  /** Placeholder text */
  placeholder?: string;
  /** Callback when a node result is selected */
  onNodeSelect?: (nodeId: string) => void;
  /** Callback when an edge result is selected */
  onEdgeSelect?: (edgeId: string) => void;
  /** Callback when search term changes */
  onSearch?: (query: string) => void;
}

/**
 * GraphSearch — Node/edge search within the graph.
 *
 * A search input that filters nodes and edges by label or ID.
 * Results are shown in a dropdown and selecting one navigates
 * to that element on the canvas.
 *
 * @example
 * <GraphSearch
 *   nodes={allNodes}
 *   onNodeSelect={(id) => centerOnNode(id)}
 * />
 */
export const GraphSearch: React.FC<GraphSearchProps> = ({
  className = '',
  style,
  nodes,
  edges = [],
  placeholder = 'Search nodes and edges...',
  onNodeSelect,
  onEdgeSelect,
  onSearch,
  ...rest
}) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      onSearch?.(value);
    },
    [onSearch]
  );

  const handleNodeClick = useCallback(
    (nodeId: string) => {
      setQuery('');
      setFocused(false);
      onNodeSelect?.(nodeId);
    },
    [onNodeSelect]
  );

  const results = query.length >= 1
    ? [
        ...nodes.filter(
          (n) =>
            n.label.toLowerCase().includes(query.toLowerCase()) ||
            n.id.toLowerCase().includes(query.toLowerCase())
        ),
        ...edges.filter(
          (e) =>
            (e.label?.toLowerCase().includes(query.toLowerCase()) ?? false) ||
            e.id.toLowerCase().includes(query.toLowerCase())
        ),
      ]
    : [];

  return (
    <div
      className={`tf-graph-search ${focused ? 'tf-graph-search--focused' : ''} ${className}`}
      style={{ position: 'relative', ...style }}
      {...rest}
    >
      <div
        className="tf-graph-search__input-wrapper"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 10px',
          backgroundColor: 'rgba(16, 22, 36, 0.95)',
          border: `1px solid ${focused ? '#4a6fa5' : '#2a3a4e'}`,
          borderRadius: 6,
        }}
      >
        <span style={{ color: '#6b7f9e', fontSize: 12 }}>🔍</span>
        <input
          ref={inputRef}
          className="tf-graph-search__input"
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder={placeholder}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#c8d6e5',
            fontSize: 12,
            width: 160,
          }}
        />
        {query && (
          <button
            className="tf-graph-search__clear"
            onClick={() => {
              setQuery('');
              onSearch?.('');
              inputRef.current?.focus();
            }}
            type="button"
            style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 10 }}
          >
            ✕
          </button>
        )}
      </div>

      {focused && results.length > 0 && (
        <div
          className="tf-graph-search__results"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: 4,
            maxHeight: 240,
            overflowY: 'auto',
            backgroundColor: 'rgba(16, 22, 36, 0.98)',
            border: '1px solid #2a3a4e',
            borderRadius: 6,
            zIndex: 100,
          }}
        >
          {results.map((result) => {
            const isNode = 'position' in result;
            return (
              <button
                key={result.id}
                className={`tf-graph-search__result tf-graph-search__result--${isNode ? 'node' : 'edge'}`}
                onClick={() => {
                  if (isNode) {
                    handleNodeClick(result.id);
                  } else {
                    setQuery('');
                    setFocused(false);
                    onEdgeSelect?.(result.id);
                  }
                }}
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                  padding: '6px 10px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #1a2332',
                  color: '#c8d6e5',
                  cursor: 'pointer',
                  fontSize: 12,
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 10, color: '#6b7f9e' }}>
                  {isNode ? '●' : '→'}
                </span>
                <span className="tf-graph-search__result-label" style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {('label' in result ? result.label : null) || result.id}
                </span>
                <span style={{ fontSize: 10, color: '#3a5274' }}>
                  {isNode ? (result as GraphNodeData).type : 'edge'}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

GraphSearch.displayName = 'GraphSearch';
export default GraphSearch;
