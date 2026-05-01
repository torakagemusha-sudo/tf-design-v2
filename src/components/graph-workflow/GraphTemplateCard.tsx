/**
 * @fileoverview GraphTemplateCard — Individual template card in the template selector.
 * A card displaying a single graph template with thumbnail and metadata.
 */

import React from 'react';
import type { GraphTemplate, GraphComponentProps } from './types';

export interface GraphTemplateCardProps extends GraphComponentProps {
  /** Template data */
  template: GraphTemplate;
  /** Whether this card is selected */
  selected?: boolean;
  /** Callback when the card is clicked */
  onClick?: (template: GraphTemplate) => void;
  /** Callback when preview is requested */
  onPreview?: (template: GraphTemplate) => void;
}

/**
 * GraphTemplateCard — Template card.
 *
 * A card component that displays a single graph template with
 * its thumbnail, name, description, node/edge counts, and tags.
 *
 * @example
 * <GraphTemplateCard
 *   template={templateData}
 *   selected={selectedId === templateData.id}
 *   onClick={(t) => selectTemplate(t)}
 * />
 */
export const GraphTemplateCard: React.FC<GraphTemplateCardProps> = ({
  className = '',
  style,
  template,
  selected = false,
  onClick,
  onPreview,
  ...rest
}) => {
  return (
    <div
      className={`tf-graph-template-card ${selected ? 'tf-graph-template-card--selected' : ''} ${className}`}
      onClick={() => onClick?.(template)}
      style={{
        padding: 14,
        backgroundColor: selected ? '#1a3050' : '#1a2332',
        border: `1px solid ${selected ? '#4a6fa5' : '#2a3a4e'}`,
        borderRadius: 8,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        ...style,
      }}
      {...rest}
    >
      {template.thumbnail && (
        <div
          className="tf-graph-template-card__thumbnail"
          style={{
            width: '100%',
            height: 90,
            backgroundColor: '#0b0f19',
            borderRadius: 4,
            marginBottom: 10,
            backgroundImage: `url(${template.thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      <div className="tf-graph-template-card__name" style={{ fontSize: 13, fontWeight: 600, color: '#c8d6e5', marginBottom: 4 }}>
        {template.name}
      </div>

      {template.description && (
        <div className="tf-graph-template-card__description" style={{ fontSize: 11, color: '#6b7f9e', marginBottom: 8, lineHeight: 1.4 }}>
          {template.description}
        </div>
      )}

      <div className="tf-graph-template-card__meta" style={{ display: 'flex', gap: 12, fontSize: 10, color: '#3a5274' }}>
        <span>{template.nodeCount} nodes</span>
        <span>{template.edgeCount} edges</span>
      </div>

      {template.tags && template.tags.length > 0 && (
        <div className="tf-graph-template-card__tags" style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
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
  );
};

GraphTemplateCard.displayName = 'GraphTemplateCard';
export default GraphTemplateCard;
