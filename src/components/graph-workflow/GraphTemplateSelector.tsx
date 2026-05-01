/**
 * @fileoverview GraphTemplateSelector — Graph template selector for creating from templates.
 * Browse and select from available graph templates when creating a new graph.
 */

import React, { useState } from 'react';
import type { GraphTemplate, GraphComponentProps } from './types';

export interface GraphTemplateSelectorProps extends GraphComponentProps {
  /** Available templates */
  templates: GraphTemplate[];
  /** Whether the selector is visible */
  visible?: boolean;
  /** Currently selected template ID */
  selectedId?: string;
  /** Callback when a template is selected */
  onSelect?: (template: GraphTemplate) => void;
  /** Callback when the selector is closed */
  onClose?: () => void;
  /** Callback when a template preview is requested */
  onPreview?: (template: GraphTemplate) => void;
}

/**
 * GraphTemplateSelector — Graph template selector.
 *
 * Displays a grid or list of available graph templates for the
 * user to choose from when creating a new graph.
 *
 * @example
 * <GraphTemplateSelector
 *   templates={availableTemplates}
 *   visible={showSelector}
 *   onSelect={(t) => createFromTemplate(t)}
 *   onClose={() => setShowSelector(false)}
 * />
 */
export const GraphTemplateSelector: React.FC<GraphTemplateSelectorProps> = ({
  className = '',
  style,
  templates,
  visible = true,
  selectedId,
  onSelect,
  onClose,
  onPreview,
  ...rest
}) => {
  const [filter, setFilter] = useState('');

  if (!visible) return null;

  const categories = [...new Set(templates.map((t) => t.category))];

  const filteredTemplates = templates.filter(
    (t) =>
      t.name.toLowerCase().includes(filter.toLowerCase()) ||
      t.description?.toLowerCase().includes(filter.toLowerCase()) ||
      t.tags?.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div
      className={`tf-graph-template-selector ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(11, 15, 25, 0.95)',
        zIndex: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        ...style,
      }}
      {...rest}
    >
      <div style={{ width: '100%', maxWidth: 800 }}>
        <div
          className="tf-graph-template-selector__header"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#c8d6e5', margin: 0 }}>
            Choose a Template
          </h2>
          <button
            className="tf-graph-template-selector__close"
            onClick={onClose}
            type="button"
            style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 20 }}
          >
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="Search templates..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            marginBottom: 20,
            background: '#1a2332',
            border: '1px solid #2a3a4e',
            borderRadius: 6,
            color: '#c8d6e5',
            fontSize: 13,
            outline: 'none',
          }}
        />

        <div
          className="tf-graph-template-selector__grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16,
            maxHeight: '60vh',
            overflowY: 'auto',
            padding: 4,
          }}
        >
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`tf-graph-template-selector__card ${selectedId === template.id ? 'tf-graph-template-selector__card--selected' : ''}`}
              onClick={() => onSelect?.(template)}
              style={{
                padding: 16,
                backgroundColor: selectedId === template.id ? '#1a3050' : '#1a2332',
                border: `1px solid ${selectedId === template.id ? '#4a6fa5' : '#2a3a4e'}`,
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {template.thumbnail && (
                <div
                  className="tf-graph-template-selector__thumbnail"
                  style={{
                    width: '100%',
                    height: 100,
                    backgroundColor: '#0b0f19',
                    borderRadius: 4,
                    marginBottom: 10,
                    backgroundImage: `url(${template.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
              <div style={{ fontSize: 13, fontWeight: 600, color: '#c8d6e5', marginBottom: 4 }}>
                {template.name}
              </div>
              {template.description && (
                <div style={{ fontSize: 11, color: '#6b7f9e', marginBottom: 8, lineHeight: 1.4 }}>
                  {template.description}
                </div>
              )}
              <div style={{ display: 'flex', gap: 12, fontSize: 10, color: '#3a5274' }}>
                <span>{template.nodeCount} nodes</span>
                <span>{template.edgeCount} edges</span>
              </div>
              {template.tags && template.tags.length > 0 && (
                <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '1px 6px',
                        backgroundColor: '#2a3a4e',
                        borderRadius: 8,
                        fontSize: 9,
                        color: '#8b9db8',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

GraphTemplateSelector.displayName = 'GraphTemplateSelector';
export default GraphTemplateSelector;
