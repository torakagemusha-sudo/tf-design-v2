/**
 * ============================================================================
 * Torafirma Design System — AcceptRejectControls
 * ============================================================================
 * AI-Assisted Studio component — AcceptRejectControls.
 *
 * @module   ai-studio/AcceptRejectControls
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import AcceptButton from './AcceptButton';
import RejectButton from './RejectButton';
import ReviseButton from './ReviseButton';

/** Props for the AcceptRejectControls component */
export interface AcceptRejectControlsProps {
  onAccept: () => void;
  onReject: () => void;
  onRevise?: () => void;
  disabled?: boolean;
  size?: ComponentSize;
  showRevise?: boolean;
}

/**
 * AcceptRejectControls
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AcceptRejectControls: React.FC<AcceptRejectControlsProps> = ({
  onAccept,
  onReject,
  onRevise,
  disabled,
  size,
  showRevise,
}) => {
  return (
    <div className={`tf-accept-reject-controls tf-accept-reject-controls--${size || 'md'}`} role="group" aria-label="Accept or reject">
      <AcceptButton onClick={onAccept} disabled={disabled} size={size} />
      <RejectButton onClick={onReject} disabled={disabled} size={size} />
      {showRevise && onRevise && (
        <ReviseButton onClick={onRevise} disabled={disabled} size={size} />
      )}
    </div>
  );
};

export default AcceptRejectControls;
