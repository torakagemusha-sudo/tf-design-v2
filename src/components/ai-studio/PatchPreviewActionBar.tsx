/**
 * ============================================================================
 * Torafirma Design System — PatchPreviewActionBar
 * ============================================================================
 * AI-Assisted Studio component — PatchPreviewActionBar.
 *
 * @module   ai-studio/PatchPreviewActionBar
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the PatchPreviewActionBar component */
export interface PatchPreviewActionBarProps {
  fileId: string;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onRevise: (id: string) => void;
  disabled?: boolean;
}

/**
 * PatchPreviewActionBar
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const PatchPreviewActionBar: React.FC<PatchPreviewActionBarProps> = ({
  fileId,
  onAccept,
  onReject,
  onRevise,
  disabled,
}) => {
  return (
    <div className="tf-patch-preview-action-bar" role="group" aria-label="Patch actions">
      <AcceptButton onClick={() => onAccept(fileId)} disabled={disabled} size="sm" />
      <RejectButton onClick={() => onReject(fileId)} disabled={disabled} size="sm" />
      <ReviseButton onClick={() => onRevise(fileId)} disabled={disabled} size="sm" />
    </div>
  );
};

export default PatchPreviewActionBar;
