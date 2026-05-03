/**
 * ============================================================================
 * Torafirma Design System — AIProposalCard
 * ============================================================================
 * AI-Assisted Studio component — AI ProposalCard.
 *
 * @module   ai-studio/AIProposalCard
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { AIProposal } from './types';
import AIProposalActions from './AIProposalActions';
import AIProposalConfidence from './AIProposalConfidence';
import AIProposalContent from './AIProposalContent';
import AIProposalHeader from './AIProposalHeader';

/** Props for the AIProposalCard component */
export interface AIProposalCardProps {
  proposal: AIProposal;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onModify: (id: string) => void;
  expanded?: boolean;
}

/**
 * AIProposalCard
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIProposalCard: React.FC<AIProposalCardProps> = ({
  proposal,
  onAccept,
  onReject,
  onModify,
  expanded,
}) => {
  return (
    <div className={`tf-ai-proposal-card tf-ai-proposal-card--${proposal.status}${expanded ? ' tf-ai-proposal-card--expanded' : ''}`}>
      <AIProposalHeader proposal={proposal} />
      <AIProposalContent proposal={proposal} />
      <AIProposalConfidence confidence={proposal.confidence} score={proposal.confidenceScore} />
      <AIProposalActions
        proposalId={proposal.id}
        onAccept={onAccept}
        onReject={onReject}
        onModify={onModify}
        status={proposal.status}
      />
    </div>
  );
};

export default AIProposalCard;
