/**
 * ============================================================================
 * Torafirma Design System — AssumptionList
 * ============================================================================
 * AI-Assisted Studio component — AssumptionList.
 *
 * @module   ai-studio/AssumptionList
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { AIAssumption } from './types';
import AssumptionItem from './AssumptionItem';

/** Props for the AssumptionList component */
export interface AssumptionListProps {
  assumptions: AIAssumption[];
  onValidate: (id: string, isValid: boolean) => void;
  onRemove: (id: string) => void;
  title?: string;
  collapsible?: boolean;
}

/**
 * AssumptionList
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AssumptionList: React.FC<AssumptionListProps> = ({
  assumptions,
  onValidate,
  onRemove,
  title,
  collapsible,
}) => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="tf-assumption-list">
      <div className="tf-assumption-list__header" onClick={() => collapsible && setCollapsed(!collapsed)} role="button" tabIndex={0}>
        <h4 className="tf-assumption-list__title">{title || 'Assumptions'}</h4>
        {collapsible && (
          <span className="tf-assumption-list__toggle" aria-hidden="true">
            {collapsed ? '▶' : '▼'}
          </span>
        )}
      </div>
      {!collapsed && (
        <div className="tf-assumption-list__items">
          {assumptions.length === 0 ? (
            <p className="tf-assumption-list__empty">No assumptions made</p>
          ) : (
            assumptions.map((assumption) => (
              <AssumptionItem
                key={assumption.id}
                assumption={assumption}
                onValidate={(isValid) => onValidate(assumption.id, isValid)}
                onRemove={() => onRemove(assumption.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AssumptionList;
