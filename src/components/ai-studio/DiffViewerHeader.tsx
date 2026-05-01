/**
 * ============================================================================
 * Torafirma Design System — DiffViewerHeader
 * ============================================================================
 * AI-Assisted Studio component — Diff ViewerHeader.
 *
 * @module   ai-studio/DiffViewerHeader
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { FileDiff, DiffDisplayMode } from './types';

/** Props for the DiffViewerHeader component */
export interface DiffViewerHeaderProps {
  fileDiff: FileDiff;
  mode?: DiffDisplayMode;
  onModeChange?: (mode: DiffDisplayMode) => void;
}

/**
 * DiffViewerHeader
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const DiffViewerHeader: React.FC<DiffViewerHeaderProps> = ({
  fileDiff,
  mode,
  onModeChange,
}) => {
  return (
    <div className="tf-diff-viewer-header">
      <div className="tf-diff-viewer-header__file">
        <span className="tf-diff-viewer-header__path">{fileDiff.newPath || fileDiff.oldPath}</span>
      </div>
      {onModeChange && (
        <div className="tf-diff-viewer-header__mode" role="tablist" aria-label="Diff view mode">
          {(['unified', 'side-by-side', 'inline'] as DiffDisplayMode[]).map((m) => (
            <button
              key={m}
              className={`tf-diff-viewer-header__mode-btn${mode === m ? ' tf-diff-viewer-header__mode-btn--active' : ''}`}
              onClick={() => onModeChange(m)}
              role="tab"
              aria-selected={mode === m}
              type="button"
            >
              {m}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiffViewerHeader;
