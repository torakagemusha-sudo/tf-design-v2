/**
 * ============================================================================
 * Torafirma Design System — AIProposalFilter
 * ============================================================================
 * AI-Assisted Studio component — AI ProposalFilter.
 *
 * @module   ai-studio/AIProposalFilter
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel, ProposalFilter } from './types';

/** Props for the AIProposalFilter component */
export interface AIProposalFilterProps {
  filter: ProposalFilter;
  onChange: (filter: ProposalFilter) => void;
  categories?: string[];
}

/**
 * AIProposalFilter
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIProposalFilter: React.FC<AIProposalFilterProps> = ({
  filter,
  onChange,
  categories,
}) => {
  const update = (partial: Partial<ProposalFilter>) => onChange({ ...filter, ...partial });

  return (
    <div className="tf-ai-proposal-filter">
      <input
        type="text"
        className="tf-ai-proposal-filter__search"
        placeholder="Search proposals..."
        value={filter.searchQuery || ''}
        onChange={(e) => update({ searchQuery: e.target.value })}
        aria-label="Search proposals"
      />
      {categories && categories.length > 0 && (
        <select
          className="tf-ai-proposal-filter__category"
          value={filter.category || ''}
          onChange={(e) => update({ category: e.target.value || undefined })}
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      )}
      <div className="tf-ai-proposal-filter__confidence">
        {(['high', 'medium', 'low', 'uncertain'] as ConfidenceLevel[]).map((level) => (
          <label key={level} className="tf-ai-proposal-filter__confidence-label">
            <input
              type="checkbox"
              checked={filter.confidence?.includes(level) ?? false}
              onChange={(e) => {
                const current = filter.confidence || [];
                update({
                  confidence: e.target.checked
                    ? [...current, level]
                    : current.filter((c) => c !== level),
                });
              }}
            />
            <span className={`tf-ai-proposal-filter__confidence-badge tf-ai-proposal-filter__confidence-badge--${level}`}>
              {level}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AIProposalFilter;
