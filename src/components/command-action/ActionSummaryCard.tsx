import React from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * Impact summary for an action.
 */
export interface ActionImpact {
  affectedObjects: number;
  affectedTypes?: string[];
  sideEffects?: string[];
  estimatedDuration?: string;
  reversibility: 'reversible' | 'irreversible' | 'rollback-only';
}

/**
 * Props for the ActionSummaryCard component.
 * Card summarizing an action's impact.
 */
export interface ActionSummaryCardProps extends TorafirmaComponentBaseProps {
  /** The action command to summarize */
  action: CommandDescriptor;
  /** Impact details for the action */
  impact: ActionImpact;
  /** Callback fired when review is requested */
  onReview: (action: CommandDescriptor) => void;
}

/**
 * ActionSummaryCard — card summarizing an action's impact.
 *
 * Displays a concise impact assessment for a command before
 * execution. Shows affected object count, types, side effects,
 * estimated duration, and reversibility status. Includes a
 * review action for operator inspection.
 *
 * @example
 * ```tsx
 * <ActionSummaryCard
 *   action={{ id: 'deploy', label: 'Deploy package', operation: 'deploy', commandClass: 'deploy', state: 'staged' }}
 *   impact={{ affectedObjects: 12, affectedTypes: ['node', 'edge'], sideEffects: ['restart runtime'], reversibility: 'rollback-only' }}
 *   onReview={(action) => console.log('Review', action.label)}
 * />
 * ```
 */
const ActionSummaryCard: React.FC<ActionSummaryCardProps> = ({
  action,
  impact,
  onReview,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  return (
    <div
      className={`tf-action-summary-card tf-action-summary-card--${action.commandClass} ${className}`}
      data-testid={testId}
      {...rest}
    >
      <div className="tf-action-summary-card__header">
        <span className={`tf-action-summary-card__class-badge tf-action-summary-card__class-badge--${action.commandClass}`}>
          {action.commandClass.toUpperCase()}
        </span>
        <span className="tf-action-summary-card__title">{action.label}</span>
      </div>

      <div className="tf-action-summary-card__body">
        <div className="tf-action-summary-card__metric">
          <span className="tf-action-summary-card__metric-value">{impact.affectedObjects}</span>
          <span className="tf-action-summary-card__metric-label">affected objects</span>
        </div>

        {impact.affectedTypes && impact.affectedTypes.length > 0 && (
          <div className="tf-action-summary-card__types">
            <span className="tf-action-summary-card__types-label">Types:</span>
            {impact.affectedTypes.map((t) => (
              <span key={t} className="tf-action-summary-card__type-tag">{t}</span>
            ))}
          </div>
        )}

        {impact.sideEffects && impact.sideEffects.length > 0 && (
          <div className="tf-action-summary-card__side-effects">
            <span className="tf-action-summary-card__side-effects-label">Side effects:</span>
            <ul className="tf-action-summary-card__side-effects-list">
              {impact.sideEffects.map((se, i) => (
                <li key={i} className="tf-action-summary-card__side-effect">{se}</li>
              ))}
            </ul>
          </div>
        )}

        {impact.estimatedDuration && (
          <div className="tf-action-summary-card__duration">
            <span className="tf-action-summary-card__duration-label">Estimated:</span>
            <span className="tf-action-summary-card__duration-value">{impact.estimatedDuration}</span>
          </div>
        )}

        <div className={`tf-action-summary-card__reversibility tf-action-summary-card__reversibility--${impact.reversibility}`}>
          <span className="tf-action-summary-card__reversibility-label">Reversibility:</span>
          <span className="tf-action-summary-card__reversibility-value">{impact.reversibility}</span>
        </div>
      </div>

      <div className="tf-action-summary-card__footer">
        <button
          type="button"
          className="tf-action-summary-card__review"
          onClick={() => onReview(action)}
        >
          Review Impact
        </button>
      </div>
    </div>
  );
};

export default ActionSummaryCard;
