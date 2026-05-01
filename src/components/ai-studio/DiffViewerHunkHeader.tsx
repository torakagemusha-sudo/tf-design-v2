/**
 * ============================================================================
 * Torafirma Design System — DiffViewerHunkHeader
 * ============================================================================
 * AI-Assisted Studio component — Diff ViewerHunkHeader.
 *
 * @module   ai-studio/DiffViewerHunkHeader
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { DiffHunk } from './types';

/** Props for the DiffViewerHunkHeader component */
export interface DiffViewerHunkHeaderProps {
  hunk: DiffHunk;
}

/**
 * DiffViewerHunkHeader
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const DiffViewerHunkHeader: React.FC<DiffViewerHunkHeaderProps> = ({
  hunk,
}) => {
  return (
    <div className="tf-diff-viewer-hunk-header">
      <span className="tf-diff-viewer-hunk-header__range">
        @@ -{hunk.oldStart},{hunk.oldLines} +{hunk.newStart},{hunk.newLines} @@
      </span>
      {hunk.heading && (
        <span className="tf-diff-viewer-hunk-header__heading">{hunk.heading}</span>
      )}
    </div>
  );
};

export default DiffViewerHunkHeader;
