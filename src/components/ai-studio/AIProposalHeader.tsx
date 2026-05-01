/**
 * ============================================================================
 * Torafirma Design System — AIProposalHeader
 * ============================================================================
 * AI-Assisted Studio component — AI ProposalHeader.
 *
 * @module   ai-studio/AIProposalHeader
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { AIProposal } from './types';

/** Props for the AIProposalHeader component */
export interface AIProposalHeaderProps {
  proposal: AIProposal;
  onClick?: () => void;
  showStatus?: boolean;
}

/**
 * AIProposalHeader
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIProposalHeader: React.FC<AIProposalHeaderProps> = ({
  proposal,
  onClick,
  showStatus,
}) => {
  return (
    <div className="tf-ai-proposal-header" onClick={onClick} role="button" tabIndex={0}>
      <div className="tf-ai-proposal-header__main">
        <span className="tf-ai-proposal-header__icon" aria-hidden="true">💡</span>
        <h3 className="tf-ai-proposal-header__title">{proposal.title}</h3>
      </div>
      <div className="tf-ai-proposal-header__meta">
        {showStatus && (
          <span className={`tf-ai-proposal-header__status tf-ai-proposal-header__status--${proposal.status}`}>
            {proposal.status}
          </span>
        )}
        {proposal.category && (
          <span className="tf-ai-proposal-header__category">{proposal.category}</span>
        )}
        <time className="tf-ai-proposal-header__time" dateTime={proposal.createdAt.toISOString()}>
          {proposal.createdAt.toLocaleTimeString()}
        </time>
      </div>
    </div>
  );
};

export default AIProposalHeader;
