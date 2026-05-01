/**
 * ============================================================================
 * Torafirma Design System — AIProposalActions
 * ============================================================================
 * AI-Assisted Studio component — AI ProposalActions.
 *
 * @module   ai-studio/AIProposalActions
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AIProposalActions component */
export interface AIProposalActionsProps {
  proposalId: string;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onModify: (id: string) => void;
  status?: string;
  disabled?: boolean;
}

/**
 * AIProposalActions
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIProposalActions: React.FC<AIProposalActionsProps> = ({
  proposalId,
  onAccept,
  onReject,
  onModify,
  status,
  disabled,
}) => {
  return (
    <div className="tf-ai-proposal-actions" role="group" aria-label="Proposal actions">
      <AcceptButton
        onClick={() => onAccept(proposalId)}
        disabled={status === 'accepted' || disabled}
      />
      <RejectButton
        onClick={() => onReject(proposalId)}
        disabled={status === 'rejected' || disabled}
      />
      <ReviseButton
        onClick={() => onModify(proposalId)}
        disabled={disabled}
      />
    </div>
  );
};

export default AIProposalActions;
