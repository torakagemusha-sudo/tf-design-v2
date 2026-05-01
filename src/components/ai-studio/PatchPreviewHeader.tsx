/**
 * ============================================================================
 * Torafirma Design System — PatchPreviewHeader
 * ============================================================================
 * AI-Assisted Studio component — PatchPreviewHeader.
 *
 * @module   ai-studio/PatchPreviewHeader
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { FileDiff } from './types';

/** Props for the PatchPreviewHeader component */
export interface PatchPreviewHeaderProps {
  fileDiff: FileDiff;
  onToggleExpand?: () => void;
  expanded?: boolean;
}

/**
 * PatchPreviewHeader
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const PatchPreviewHeader: React.FC<PatchPreviewHeaderProps> = ({
  fileDiff,
  onToggleExpand,
  expanded,
}) => {
  return (
    <div className="tf-patch-preview-header">
      <div className="tf-patch-preview-header__paths">
        {fileDiff.isDeleted ? (
          <span className="tf-patch-preview-header__path tf-patch-preview-header__path--deleted">{fileDiff.oldPath}</span>
        ) : fileDiff.isNew ? (
          <span className="tf-patch-preview-header__path tf-patch-preview-header__path--added">{fileDiff.newPath}</span>
        ) : (
          <>
            <span className="tf-patch-preview-header__path tf-patch-preview-header__path--old">{fileDiff.oldPath}</span>
            <span className="tf-patch-preview-header__arrow" aria-hidden="true">→</span>
            <span className="tf-patch-preview-header__path tf-patch-preview-header__path--new">{fileDiff.newPath}</span>
          </>
        )}
      </div>
      <div className="tf-patch-preview-header__meta">
        {fileDiff.isNew && <span className="tf-patch-preview-header__badge tf-patch-preview-header__badge--new">new</span>}
        {fileDiff.isDeleted && <span className="tf-patch-preview-header__badge tf-patch-preview-header__badge--deleted">deleted</span>}
        <span className="tf-patch-preview-header__hunks">{fileDiff.hunks.length} hunks</span>
        {onToggleExpand && (
          <button className="tf-patch-preview-header__expand" onClick={onToggleExpand} type="button" aria-label={expanded ? 'Collapse' : 'Expand'}>
            {expanded ? '▼' : '▶'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PatchPreviewHeader;
