/**
 * ============================================================================
 * Torafirma Design System — AIFineTuneStatus
 * ============================================================================
 * AI-Assisted Studio component — AI FineTuneStatus.
 *
 * @module   ai-studio/AIFineTuneStatus
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { FineTuneStatus } from './types';

/** Props for the AIFineTuneStatus component */
export interface AIFineTuneStatusProps {
  status: FineTuneStatus;
  onCancel: (id: string) => void;
  onViewLogs: (id: string) => void;
}

/**
 * AIFineTuneStatus
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIFineTuneStatus: React.FC<AIFineTuneStatusProps> = ({
  status,
  onCancel,
  onViewLogs,
}) => {
  return (
    <div className={`tf-ai-fine-tune-status tf-ai-fine-tune-status--${status.status}`}>
      <div className="tf-ai-fine-tune-status__header">
        <span className="tf-ai-fine-tune-status__model">{status.modelId}</span>
        <span className={`tf-ai-fine-tune-status__badge tf-ai-fine-tune-status__badge--${status.status}`}>
          {status.status}
        </span>
      </div>
      <div className="tf-ai-fine-tune-status__progress">
        <div className="tf-ai-fine-tune-status__bar">
          <div
            className="tf-ai-fine-tune-status__fill"
            style={{ width: `${status.progress}%` }}
            role="progressbar"
            aria-valuenow={status.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <span className="tf-ai-fine-tune-status__percent">{Math.round(status.progress)}%</span>
      </div>
      {status.epochs !== undefined && (
        <div className="tf-ai-fine-tune-status__meta">
          <span>Epochs: {status.epochs}</span>
          {status.loss !== undefined && <span>Loss: {status.loss.toFixed(4)}</span>}
        </div>
      )}
      <div className="tf-ai-fine-tune-status__actions">
        {status.status === 'running' && (
          <button className="tf-ai-fine-tune-status__cancel" onClick={() => onCancel(status.id)} type="button">
            Cancel
          </button>
        )}
        <button className="tf-ai-fine-tune-status__logs" onClick={() => onViewLogs(status.id)} type="button">
          View Logs
        </button>
      </div>
    </div>
  );
};

export default AIFineTuneStatus;
