/**
 * ============================================================================
 * Torafirma Design System — DiffViewerInline
 * ============================================================================
 * AI-Assisted Studio component — Diff ViewerInline.
 *
 * @module   ai-studio/DiffViewerInline
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { DiffHunk } from './types';
import DiffViewerHunkHeader from './DiffViewerHunkHeader';
import DiffViewerLine from './DiffViewerLine';

/** Props for the DiffViewerInline component */
export interface DiffViewerInlineProps {
  hunks: DiffHunk[];
}

/**
 * DiffViewerInline
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const DiffViewerInline: React.FC<DiffViewerInlineProps> = ({
  hunks,
}) => {
  return (
    <div className="tf-diff-viewer-inline">
      {hunks.map((hunk) => (
        <div key={hunk.id} className="tf-diff-viewer-inline__hunk">
          <DiffViewerHunkHeader hunk={hunk} />
          {hunk.lines.map((line, i) => (
            <DiffViewerLine key={i} line={line} showLineNumbers={false} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default DiffViewerInline;
