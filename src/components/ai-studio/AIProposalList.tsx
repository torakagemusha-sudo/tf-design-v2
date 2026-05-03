/**
 * ============================================================================
 * Torafirma Design System — AIProposalList
 * ============================================================================
 * AI-Assisted Studio component — AI ProposalList.
 *
 * @module   ai-studio/AIProposalList
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { AIProposal } from './types';
import AIProposalCard from './AIProposalCard';

/** Props for the AIProposalList component */
export interface AIProposalListProps {
  proposals: AIProposal[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onModify: (id: string) => void;
  onSelect?: (proposal: AIProposal) => void;
  selectedId?: string;
  emptyMessage?: string;
}

/**
 * AIProposalList
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIProposalList: React.FC<AIProposalListProps> = ({
  proposals,
  onAccept,
  onReject,
  onModify,
  onSelect,
  selectedId,
  emptyMessage,
}) => {
  if (proposals.length === 0) {
    return (
      <div className="tf-ai-proposal-list tf-ai-proposal-list--empty">
        <p className="tf-ai-proposal-list__empty">{emptyMessage || 'No proposals yet'}</p>
      </div>
    );
  }

  return (
    <div className="tf-ai-proposal-list">
      {proposals.map((proposal) => (
        <div
          key={proposal.id}
          className={`tf-ai-proposal-list__item${selectedId === proposal.id ? ' tf-ai-proposal-list__item--selected' : ''}`}
          onClick={() => onSelect?.(proposal)}
          role="listitem"
        >
          <AIProposalCard
            proposal={proposal}
            onAccept={onAccept}
            onReject={onReject}
            onModify={onModify}
          />
        </div>
      ))}
    </div>
  );
};

export default AIProposalList;
