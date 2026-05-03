/**
 * ============================================================
 * ProgressStepper — Torafirma Design System
 * ============================================================
 *
 * Multi-step progress indicator showing a sequence of steps
 * with their completion state. Supports vertical and horizontal
 * orientations with step labels and descriptions.
 *
 * From 03.2 State, Status & Telemetry — Section 3.2 State Components
 * ============================================================
 */

import React from 'react';
import type { ComponentDensity } from '../../types';

/**
 * Individual step descriptor.
 */
export interface ProgressStep {
  /** Step label. */
  label: string;
  /** Optional step description. */
  description?: string;
  /** Step state. */
  state: 'pending' | 'active' | 'complete' | 'error' | 'skipped';
}

/**
 * Props for the ProgressStepper component.
 */
export interface ProgressStepperProps {
  /** Array of steps to display. */
  steps: ProgressStep[];
  /** Current active step index. */
  currentStep?: number;
  /** Layout orientation. */
  orientation?: 'horizontal' | 'vertical';
  /** Layout density. */
  density?: ComponentDensity;
  /** Whether to allow clicking on completed steps. */
  allowClickBack?: boolean;
  /** Handler invoked when a step is clicked. */
  onStepClick?: (stepIndex: number) => void;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * ProgressStepper renders a multi-step progress indicator.
 *
 * @example
 * ```tsx
 * <ProgressStepper
 *   steps={[
 *     { label: 'Validate', state: 'complete' },
 *     { label: 'Stage', state: 'active' },
 *     { label: 'Commit', state: 'pending' },
 *   ]}
 *   currentStep={1}
 * />
 * ```
 */
export const ProgressStepper: React.FC<ProgressStepperProps> = ({
  steps,
  currentStep = 0,
  orientation = 'horizontal',
  density = 'standard',
  allowClickBack = false,
  onStepClick,
  className = '',
  testId,
}) => {
  const orientClass = `tf-progress-stepper--${orientation}`;
  const densityClass = `tf-density-${density}`;

  return (
    <div
      className={`tf-progress-stepper ${orientClass} ${densityClass} ${className}`}
      data-testid={testId}
      role="list"
      aria-label="Progress steps"
    >
      {steps.map((step, index) => {
        const isClickable = allowClickBack && step.state === 'complete' && onStepClick;

        return (
          <div
            key={index}
            className={`tf-progress-stepper__step tf-progress-stepper__step--${step.state}
              ${index === currentStep ? 'tf-progress-stepper__step--current' : ''}
              ${isClickable ? 'tf-progress-stepper__step--clickable' : ''}
            `}
            role="listitem"
            aria-current={index === currentStep ? 'step' : undefined}
            aria-label={`${step.label}: ${step.state}`}
            onClick={isClickable ? () => onStepClick(index) : undefined}
            style={{ cursor: isClickable ? 'pointer' : undefined }}
          >
            <span className={`tf-progress-stepper__indicator tf-progress-stepper__indicator--${step.state}`} aria-hidden="true">
              {step.state === 'complete' ? '&#x2713;' : step.state === 'error' ? '!' : index + 1}
            </span>
            <div className="tf-progress-stepper__content">
              <span className="tf-progress-stepper__label">{step.label}</span>
              {step.description && (
                <span className="tf-progress-stepper__description">{step.description}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <span className={`tf-progress-stepper__connector tf-progress-stepper__connector--${step.state}`} aria-hidden="true" />
            )}
          </div>
        );
      })}
    </div>
  );
};

ProgressStepper.displayName = 'ProgressStepper';

export default ProgressStepper;
