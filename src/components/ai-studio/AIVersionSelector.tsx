/**
 * ============================================================================
 * Torafirma Design System — AIVersionSelector
 * ============================================================================
 * AI-Assisted Studio component — AI VersionSelector.
 *
 * @module   ai-studio/AIVersionSelector
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { ModelVersion } from './types';

/** Props for the AIVersionSelector component */
export interface AIVersionSelectorProps {
  versions: ModelVersion[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onDeploy: (id: string) => void;
  onRollback: (id: string) => void;
}

/**
 * AIVersionSelector
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIVersionSelector: React.FC<AIVersionSelectorProps> = ({
  versions,
  selectedId,
  onSelect,
  onDeploy,
  onRollback,
}) => {
  return (
    <div className="tf-ai-version-selector">
      <h4 className="tf-ai-version-selector__title">Model Versions</h4>
      <div className="tf-ai-version-selector__list">
        {versions.map((v) => (
          <div
            key={v.id}
            className={`tf-ai-version-selector__item${selectedId === v.id ? ' tf-ai-version-selector__item--selected' : ''}`}
          >
            <span className="tf-ai-version-selector__version">{v.version}</span>
            <span className={`tf-ai-version-selector__status tf-ai-version-selector__status--${v.deploymentStatus}`}>
              {v.deploymentStatus}
            </span>
            {v.isActive && (
              <span className="tf-ai-version-selector__active">active</span>
            )}
            <time className="tf-ai-version-selector__date" dateTime={v.createdAt.toISOString()}>
              {v.createdAt.toLocaleDateString()}
            </time>
            <div className="tf-ai-version-selector__actions">
              <button className="tf-ai-version-selector__btn" onClick={() => onSelect(v.id)} type="button">Select</button>
              {v.deploymentStatus === 'not_deployed' && (
                <button className="tf-ai-version-selector__btn tf-ai-version-selector__btn--deploy" onClick={() => onDeploy(v.id)} type="button">
                  Deploy
                </button>
              )}
              {v.deploymentStatus === 'deployed' && v.isActive && (
                <button className="tf-ai-version-selector__btn" onClick={() => onRollback(v.id)} type="button">
                  Rollback
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIVersionSelector;
