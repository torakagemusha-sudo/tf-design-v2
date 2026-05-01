/**
 * ============================================================================
 * Torafirma Design System — AIProposalContent
 * ============================================================================
 * AI-Assisted Studio component — AI ProposalContent.
 *
 * @module   ai-studio/AIProposalContent
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { AIProposal } from './types';

/** Props for the AIProposalContent component */
export interface AIProposalContentProps {
  proposal: AIProposal;
  maxLength?: number;
  showTags?: boolean;
}

/**
 * AIProposalContent
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIProposalContent: React.FC<AIProposalContentProps> = ({
  proposal,
  maxLength,
  showTags,
}) => {
  const truncated = maxLength && proposal.description.length > maxLength
    ? proposal.description.slice(0, maxLength) + '...'
    : proposal.description;

  return (
    <div className="tf-ai-proposal-content">
      <p className="tf-ai-proposal-content__description">{truncated}</p>
      {showTags && proposal.tags && proposal.tags.length > 0 && (
        <div className="tf-ai-proposal-content__tags">
          {proposal.tags.map((tag) => (
            <span key={tag} className="tf-ai-proposal-content__tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIProposalContent;
