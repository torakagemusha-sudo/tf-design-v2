/**
 * ============================================================================
 * Torafirma Design System — AIModelCard
 * ============================================================================
 * AI-Assisted Studio component — AI ModelCard.
 *
 * @module   ai-studio/AIModelCard
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { ModelCard } from './types';

/** Props for the AIModelCard component */
export interface AIModelCardProps {
  card: ModelCard;
  onExport?: () => void;
  compact?: boolean;
}

/**
 * AIModelCard
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIModelCard: React.FC<AIModelCardProps> = ({
  card,
  onExport,
  compact,
}) => {
  return (
    <div className={`tf-ai-model-card tf-ai-model-card--${compact ? 'compact' : 'full'}`}>
      <div className="tf-ai-model-card__header">
        <h3 className="tf-ai-model-card__name">{card.modelName}</h3>
        <span className="tf-ai-model-card__version">v{card.version}</span>
        <span className="tf-ai-model-card__license">{card.license}</span>
      </div>
      <p className="tf-ai-model-card__description">{card.description}</p>
      <div className="tf-ai-model-card__section">
        <h4 className="tf-ai-model-card__section-title">Intended Use</h4>
        <p className="tf-ai-model-card__text">{card.intendedUse}</p>
      </div>
      <div className="tf-ai-model-card__section">
        <h4 className="tf-ai-model-card__section-title">Factors</h4>
        <ul className="tf-ai-model-card__list">
          {card.factors.map((f, i) => (
            <li key={i} className="tf-ai-model-card__list-item">{f}</li>
          ))}
        </ul>
      </div>
      <div className="tf-ai-model-card__section">
        <h4 className="tf-ai-model-card__section-title">Metrics</h4>
        <dl className="tf-ai-model-card__metrics">
          {Object.entries(card.metrics).map(([name, value]) => (
            <div key={name} className="tf-ai-model-card__metric">
              <dt className="tf-ai-model-card__metric-name">{name}</dt>
              <dd className="tf-ai-model-card__metric-value">{typeof value === 'number' ? value.toFixed(4) : value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="tf-ai-model-card__section">
        <h4 className="tf-ai-model-card__section-title">Evaluation Data</h4>
        <p className="tf-ai-model-card__text">{card.evaluationData}</p>
        <h4 className="tf-ai-model-card__section-title">Training Data</h4>
        <p className="tf-ai-model-card__text">{card.trainingData}</p>
      </div>
      <div className="tf-ai-model-card__section">
        <h4 className="tf-ai-model-card__section-title">Ethical Considerations</h4>
        <ul className="tf-ai-model-card__list">
          {card.ethicalConsiderations.map((e, i) => (
            <li key={i} className="tf-ai-model-card__list-item">{e}</li>
          ))}
        </ul>
      </div>
      <div className="tf-ai-model-card__section">
        <h4 className="tf-ai-model-card__section-title">Caveats</h4>
        <ul className="tf-ai-model-card__list">
          {card.caveats.map((c, i) => (
            <li key={i} className="tf-ai-model-card__list-item">{c}</li>
          ))}
        </ul>
      </div>
      {onExport && (
        <button className="tf-ai-model-card__export" onClick={onExport} type="button">
          Export Card
        </button>
      )}
    </div>
  );
};

export default AIModelCard;
