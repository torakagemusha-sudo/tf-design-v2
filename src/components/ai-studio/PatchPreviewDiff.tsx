/**
 * ============================================================================
 * Torafirma Design System — PatchPreviewDiff
 * ============================================================================
 * AI-Assisted Studio component — PatchPreviewDiff .
 *
 * @module   ai-studio/PatchPreviewDiff
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { DiffHunk, DiffDisplayMode } from './types';

/** Props for the PatchPreviewDiff component */
export interface PatchPreviewDiffProps {
  hunks: DiffHunk[];
  mode?: DiffDisplayMode;
}

/**
 * PatchPreviewDiff
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const PatchPreviewDiff: React.FC<PatchPreviewDiffProps> = ({
  hunks,
  mode,
}) => {
  return (
    <div className={`tf-patch-preview-diff tf-patch-preview-diff--${mode || 'unified'}`}>
      {hunks.map((hunk) => (
        <PatchPreviewHunk key={hunk.id} hunk={hunk} mode={mode} />
      ))}
    </div>
  );
};

export default PatchPreviewDiff;
