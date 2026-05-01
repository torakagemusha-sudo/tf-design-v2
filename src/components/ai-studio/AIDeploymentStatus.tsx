/**
 * ============================================================================
 * Torafirma Design System — AIDeploymentStatus
 * ============================================================================
 * AI-Assisted Studio component — AI DeploymentStatus.
 *
 * @module   ai-studio/AIDeploymentStatus
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AIDeploymentStatus component */
export interface AIDeploymentStatusProps {
  modelName: string;
  status: 'not_deployed' | 'deploying' | 'deployed' | 'rolling_back' | 'failed';
  progress: number;
  environment: string;
  lastDeployedAt?: Date;
}

/**
 * AIDeploymentStatus
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIDeploymentStatus: React.FC<AIDeploymentStatusProps> = ({
  modelName,
  status,
  progress,
  environment,
  lastDeployedAt,
}) => {
  return (
    <div className={`tf-ai-deployment-status tf-ai-deployment-status--${status}`}>
      <div className="tf-ai-deployment-status__header">
        <h4 className="tf-ai-deployment-status__model">{modelName}</h4>
        <span className="tf-ai-deployment-status__env">{environment}</span>
      </div>
      <div className="tf-ai-deployment-status__indicator">
        <span className={`tf-ai-deployment-status__badge tf-ai-deployment-status__badge--${status}`}>
          {status.replace('_', ' ')}
        </span>
        {lastDeployedAt && (
          <time className="tf-ai-deployment-status__time" dateTime={lastDeployedAt.toISOString()}>
            Last: {lastDeployedAt.toLocaleString()}
          </time>
        )}
      </div>
      {(status === 'deploying' || status === 'rolling_back') && (
        <div className="tf-ai-deployment-status__progress">
          <div className="tf-ai-deployment-status__bar">
            <div
              className="tf-ai-deployment-status__fill"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
    </div>
  );
};

export default AIDeploymentStatus;
