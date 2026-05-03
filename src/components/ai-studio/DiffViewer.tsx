/**
 * ============================================================================
 * Torafirma Design System — DiffViewer
 * ============================================================================
 * AI-Assisted Studio component — Diff Viewer.
 *
 * @module   ai-studio/DiffViewer
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { FileDiff, DiffDisplayMode } from './types';
import DiffViewerHeader from './DiffViewerHeader';
import DiffViewerInline from './DiffViewerInline';
import DiffViewerSideBySide from './DiffViewerSideBySide';
import DiffViewerUnified from './DiffViewerUnified';

/** Props for the DiffViewer component */
export interface DiffViewerProps {
  fileDiff: FileDiff;
  mode?: DiffDisplayMode;
  onModeChange?: (mode: DiffDisplayMode) => void;
  showLineNumbers?: boolean;
  highlightSyntax?: boolean;
}

/**
 * DiffViewer
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const DiffViewer: React.FC<DiffViewerProps> = ({
  fileDiff,
  mode,
  onModeChange,
  showLineNumbers,
  highlightSyntax,
}) => {
  return (
    <div className="tf-diff-viewer">
      <DiffViewerHeader
        fileDiff={fileDiff}
        mode={mode}
        onModeChange={onModeChange}
      />
      <div className="tf-diff-viewer__content">
        {mode === 'side-by-side' ? (
          <DiffViewerSideBySide hunks={fileDiff.hunks} showLineNumbers={showLineNumbers} />
        ) : mode === 'inline' ? (
          <DiffViewerInline hunks={fileDiff.hunks} />
        ) : (
          <DiffViewerUnified hunks={fileDiff.hunks} showLineNumbers={showLineNumbers} />
        )}
      </div>
    </div>
  );
};

export default DiffViewer;
