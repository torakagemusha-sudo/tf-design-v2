/**
 * ============================================================================
 * Torafirma Design System — DiffViewerSideBySide
 * ============================================================================
 * AI-Assisted Studio component — Diff ViewerSideBySide.
 *
 * @module   ai-studio/DiffViewerSideBySide
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { DiffHunk } from './types';
import DiffViewerHunkHeader from './DiffViewerHunkHeader';

/** Props for the DiffViewerSideBySide component */
export interface DiffViewerSideBySideProps {
  hunks: DiffHunk[];
  showLineNumbers?: boolean;
}

/**
 * DiffViewerSideBySide
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const DiffViewerSideBySide: React.FC<DiffViewerSideBySideProps> = ({
  hunks,
  showLineNumbers,
}) => {
  return (
    <div className="tf-diff-viewer-side-by-side">
      <div className="tf-diff-viewer-side-by-side__header">
        <span className="tf-diff-viewer-side-by-side__col-header">Before</span>
        <span className="tf-diff-viewer-side-by-side__col-header">After</span>
      </div>
      {hunks.map((hunk) => (
        <div key={hunk.id} className="tf-diff-viewer-side-by-side__hunk">
          <DiffViewerHunkHeader hunk={hunk} />
          {hunk.lines.map((line, i) => (
            <div key={i} className={`tf-diff-viewer-side-by-side__row tf-diff-viewer-side-by-side__row--${line.type}`}>
              <div className="tf-diff-viewer-side-by-side__cell tf-diff-viewer-side-by-side__cell--old">
                {showLineNumbers && line.oldLineNumber && (
                  <span className="tf-diff-viewer-side-by-side__line-num">{line.oldLineNumber}</span>
                )}
                {line.type !== 'added' && (
                  <code>{line.content}</code>
                )}
              </div>
              <div className="tf-diff-viewer-side-by-side__cell tf-diff-viewer-side-by-side__cell--new">
                {showLineNumbers && line.newLineNumber && (
                  <span className="tf-diff-viewer-side-by-side__line-num">{line.newLineNumber}</span>
                )}
                {line.type !== 'removed' && (
                  <code>{line.content}</code>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DiffViewerSideBySide;
