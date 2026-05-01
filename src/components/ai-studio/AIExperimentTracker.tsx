/**
 * ============================================================================
 * Torafirma Design System — AIExperimentTracker
 * ============================================================================
 * AI-Assisted Studio component — AI ExperimentTracker.
 *
 * @module   ai-studio/AIExperimentTracker
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { AIExperiment } from './types';

/** Props for the AIExperimentTracker component */
export interface AIExperimentTrackerProps {
  experiments: AIExperiment[];
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDuplicate: (id: string) => void;
  onArchive: (id: string) => void;
}

/**
 * AIExperimentTracker
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIExperimentTracker: React.FC<AIExperimentTrackerProps> = ({
  experiments,
  onSelect,
  onCreate,
  onDuplicate,
  onArchive,
}) => {
  return (
    <div className="tf-ai-experiment-tracker">
      <div className="tf-ai-experiment-tracker__header">
        <h4 className="tf-ai-experiment-tracker__title">Experiments</h4>
        <button className="tf-ai-experiment-tracker__create" onClick={onCreate} type="button">
          + New Experiment
        </button>
      </div>
      <div className="tf-ai-experiment-tracker__list">
        {experiments.map((exp) => (
          <AIExperimentCard
            key={exp.id}
            experiment={exp}
            onClick={() => onSelect(exp.id)}
            onDuplicate={() => onDuplicate(exp.id)}
            onArchive={() => onArchive(exp.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AIExperimentTracker;
