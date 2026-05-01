/**
 * ============================================================================
 * Torafirma Design System — PatchPreviewHunk
 * ============================================================================
 * AI-Assisted Studio component — PatchPreviewHunk.
 *
 * @module   ai-studio/PatchPreviewHunk
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { DiffHunk, DiffDisplayMode } from './types';

/** Props for the PatchPreviewHunk component */
export interface PatchPreviewHunkProps {
  hunk: DiffHunk;
  mode?: DiffDisplayMode;
}

/**
 * PatchPreviewHunk
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const PatchPreviewHunk: React.FC<PatchPreviewHunkProps> = ({
  hunk,
  mode,
}) => {
  return (
    <div className="tf-patch-preview-hunk">
      <DiffViewerHunkHeader hunk={hunk} />
      <div className="tf-patch-preview-hunk__lines">
        {hunk.lines.map((line, i) => (
          <DiffViewerLine key={i} line={line} />
        ))}
      </div>
    </div>
  );
};

export default PatchPreviewHunk;
