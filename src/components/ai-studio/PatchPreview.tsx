/**
 * ============================================================================
 * Torafirma Design System — PatchPreview
 * ============================================================================
 * AI-Assisted Studio component — PatchPreview.
 *
 * @module   ai-studio/PatchPreview
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { FileDiff } from './types';
import PatchPreviewActionBar from './PatchPreviewActionBar';
import PatchPreviewDiff from './PatchPreviewDiff';
import PatchPreviewHeader from './PatchPreviewHeader';

/** Props for the PatchPreview component */
export interface PatchPreviewProps {
  fileDiff: FileDiff;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onRevise: (id: string) => void;
  expanded?: boolean;
}

/**
 * PatchPreview
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const PatchPreview: React.FC<PatchPreviewProps> = ({
  fileDiff,
  onAccept,
  onReject,
  onRevise,
  expanded,
}) => {
  return (
    <div className={`tf-patch-preview${expanded ? ' tf-patch-preview--expanded' : ''}`}>
      <PatchPreviewHeader fileDiff={fileDiff} />
      <PatchPreviewDiff hunks={fileDiff.hunks} />
      <PatchPreviewActionBar
        fileId={fileDiff.id}
        onAccept={onAccept}
        onReject={onReject}
        onRevise={onRevise}
      />
    </div>
  );
};

export default PatchPreview;
