/**
 * ============================================================================
 * Torafirma Design System — DiffViewerLine
 * ============================================================================
 * AI-Assisted Studio component — Diff ViewerLine.
 *
 * @module   ai-studio/DiffViewerLine
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { DiffLine } from './types';

/** Props for the DiffViewerLine component */
export interface DiffViewerLineProps {
  line: DiffLine;
  showLineNumbers?: boolean;
}

/**
 * DiffViewerLine
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const DiffViewerLine: React.FC<DiffViewerLineProps> = ({
  line,
  showLineNumbers,
}) => {
  const typeClass = `tf-diff-viewer-line--${line.type}`;

  return (
    <div className={`tf-diff-viewer-line ${typeClass}`} role="presentation">
      {showLineNumbers && (
        <div className="tf-diff-viewer-line__numbers">
          <span className="tf-diff-viewer-line__old-num">{line.oldLineNumber ?? ''}</span>
          <span className="tf-diff-viewer-line__new-num">{line.newLineNumber ?? ''}</span>
        </div>
      )}
      <div className="tf-diff-viewer-line__content">
        <span className="tf-diff-viewer-line__marker" aria-hidden="true">
          {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
        </span>
        <code className="tf-diff-viewer-line__code">{line.content}</code>
      </div>
    </div>
  );
};

export default DiffViewerLine;
