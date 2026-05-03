/**
 * ============================================================================
 * Torafirma Design System — DiffViewerUnified
 * ============================================================================
 * AI-Assisted Studio component — Diff ViewerUnified.
 *
 * @module   ai-studio/DiffViewerUnified
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { DiffHunk } from './types';
import DiffViewerHunkHeader from './DiffViewerHunkHeader';
import DiffViewerLine from './DiffViewerLine';

/** Props for the DiffViewerUnified component */
export interface DiffViewerUnifiedProps {
  hunks: DiffHunk[];
  showLineNumbers?: boolean;
}

/**
 * DiffViewerUnified
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const DiffViewerUnified: React.FC<DiffViewerUnifiedProps> = ({
  hunks,
  showLineNumbers,
}) => {
  return (
    <div className="tf-diff-viewer-unified">
      {hunks.map((hunk) => (
        <div key={hunk.id} className="tf-diff-viewer-unified__hunk">
          <DiffViewerHunkHeader hunk={hunk} />
          {hunk.lines.map((line, i) => (
            <DiffViewerLine key={i} line={line} showLineNumbers={showLineNumbers} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default DiffViewerUnified;
