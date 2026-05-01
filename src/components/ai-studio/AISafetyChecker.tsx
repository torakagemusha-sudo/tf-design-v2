/**
 * ============================================================================
 * Torafirma Design System — AISafetyChecker
 * ============================================================================
 * AI-Assisted Studio component — AI SafetyChecker.
 *
 * @module   ai-studio/AISafetyChecker
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { SafetyCheckResult } from './types';

/** Props for the AISafetyChecker component */
export interface AISafetyCheckerProps {
  checks: SafetyCheckResult[];
  onReRun: () => void;
  onOverride: (id: string) => void;
  strictMode?: boolean;
}

/**
 * AISafetyChecker
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AISafetyChecker: React.FC<AISafetyCheckerProps> = ({
  checks,
  onReRun,
  onOverride,
  strictMode,
}) => {
  const passed = checks.filter((c) => c.passed).length;
  const failed = checks.filter((c) => !c.passed);

  return (
    <div className={`tf-ai-safety-checker tf-ai-safety-checker--${failed.length === 0 ? 'passed' : 'failed'}`}>
      <div className="tf-ai-safety-checker__header">
        <h4 className="tf-ai-safety-checker__title">Safety Checks</h4>
        <span className="tf-ai-safety-checker__summary">
          {passed} / {checks.length} passed
        </span>
      </div>
      {failed.length > 0 && strictMode && (
        <div className="tf-ai-safety-checker__warning">
          ⚠ {failed.length} check{failed.length !== 1 ? 's' : ''} failed. Deployment blocked in strict mode.
        </div>
      )}
      <div className="tf-ai-safety-checker__list">
        {checks.map((check) => (
          <div
            key={check.id}
            className={`tf-ai-safety-checker__item tf-ai-safety-checker__item--${check.passed ? 'passed' : 'failed'} tf-ai-safety-checker__item--${check.severity || 'info'}`}
          >
            <span className="tf-ai-safety-checker__icon" aria-hidden="true">
              {check.passed ? '✓' : '✕'}
            </span>
            <span className="tf-ai-safety-checker__name">{check.check}</span>
            <span className="tf-ai-safety-checker__category">{check.category}</span>
            {!check.passed && (
              <button
                className="tf-ai-safety-checker__override"
                onClick={() => onOverride(check.id)}
                type="button"
                disabled={strictMode}
              >
                Override
              </button>
            )}
            {check.details && (
              <p className="tf-ai-safety-checker__details">{check.details}</p>
            )}
          </div>
        ))}
      </div>
      <button className="tf-ai-safety-checker__rerun" onClick={onReRun} type="button">
        Re-run Checks
      </button>
    </div>
  );
};

export default AISafetyChecker;
