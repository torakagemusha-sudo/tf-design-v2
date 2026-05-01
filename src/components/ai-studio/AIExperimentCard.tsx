/**
 * ============================================================================
 * Torafirma Design System — AIExperimentCard
 * ============================================================================
 * AI-Assisted Studio component — AI ExperimentCard.
 *
 * @module   ai-studio/AIExperimentCard
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { AIExperiment } from './types';

/** Props for the AIExperimentCard component */
export interface AIExperimentCardProps {
  experiment: AIExperiment;
  onClick: () => void;
  onDuplicate: () => void;
  onArchive: () => void;
}

/**
 * AIExperimentCard
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIExperimentCard: React.FC<AIExperimentCardProps> = ({
  experiment,
  onClick,
  onDuplicate,
  onArchive,
}) => {
  return (
    <div className={`tf-ai-experiment-card tf-ai-experiment-card--${experiment.status}`} onClick={onClick} role="button" tabIndex={0}>
      <div className="tf-ai-experiment-card__header">
        <h5 className="tf-ai-experiment-card__name">{experiment.name}</h5>
        <span className={`tf-ai-experiment-card__status tf-ai-experiment-card__status--${experiment.status}`}>
          {experiment.status}
        </span>
      </div>
      <p className="tf-ai-experiment-card__desc">{experiment.description}</p>
      <AIExperimentMetrics metrics={experiment.metrics} />
      <div className="tf-ai-experiment-card__actions" onClick={(e) => e.stopPropagation()}>
        <button className="tf-ai-experiment-card__btn" onClick={onDuplicate} type="button">Duplicate</button>
        <button className="tf-ai-experiment-card__btn" onClick={onArchive} type="button">Archive</button>
      </div>
    </div>
  );
};

export default AIExperimentCard;
