import React, { useState } from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * A single confirmation step.
 */
export interface ConfirmationStep {
  id: string;
  label: string;
  description: string;
  acknowledged: boolean;
}

/**
 * Props for the ActionConfirmationStepper component.
 * Multi-step confirmation flow.
 */
export interface ActionConfirmationStepperProps extends TorafirmaComponentBaseProps {
  /** Array of confirmation steps */
  steps: ConfirmationStep[];
  /** Callback fired when all steps are confirmed */
  onConfirm: () => void;
  /** Callback fired when confirmation is cancelled */
  onCancel: () => void;
}

/**
 * ActionConfirmationStepper — multi-step confirmation flow.
 *
 * Presents a sequential checklist of acknowledgments that the
 * operator must confirm before proceeding. Each step requires
 * explicit acknowledgment. The primary action remains disabled
 * until all steps are checked, ensuring deliberate progression
 * through high-consequence confirmations.
 *
 * @example
 * ```tsx
 * <ActionConfirmationStepper
 *   steps={[
 *     { id: 's1', label: 'Verify target', description: 'Runtime target is production', acknowledged: false },
 *     { id: 's2', label: 'Confirm impact', description: '12 objects will be affected', acknowledged: false },
 *   ]}
 *   onConfirm={() => console.log('Confirmed')}
 *   onCancel={() => console.log('Cancelled')}
 * />
 * ```
 */
const ActionConfirmationStepper: React.FC<ActionConfirmationStepperProps> = ({
  steps: initialSteps,
  onConfirm,
  onCancel,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const [steps, setSteps] = useState<ConfirmationStep[]>(initialSteps);

  const toggleStep = (stepId: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, acknowledged: !s.acknowledged } : s))
    );
  };

  const allAcknowledged = steps.every((s) => s.acknowledged);

  return (
    <div className={`tf-action-confirmation-stepper ${className}`} data-testid={testId} {...rest}>
      <div className="tf-action-confirmation-stepper__header">
        <span className="tf-action-confirmation-stepper__title">Confirmation Required</span>
        <span className="tf-action-confirmation-stepper__progress">
          {steps.filter((s) => s.acknowledged).length}/{steps.length}
        </span>
      </div>
      <ol className="tf-action-confirmation-stepper__list">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={`tf-action-confirmation-stepper__step ${step.acknowledged ? 'tf-action-confirmation-stepper__step--acknowledged' : ''}`}
          >
            <label className="tf-action-confirmation-stepper__label">
              <input
                type="checkbox"
                checked={step.acknowledged}
                onChange={() => toggleStep(step.id)}
              />
              <span className="tf-action-confirmation-stepper__step-number">{index + 1}</span>
              <div className="tf-action-confirmation-stepper__step-content">
                <span className="tf-action-confirmation-stepper__step-label">{step.label}</span>
                <span className="tf-action-confirmation-stepper__step-description">{step.description}</span>
              </div>
            </label>
          </li>
        ))}
      </ol>
      <div className="tf-action-confirmation-stepper__footer">
        <button
          type="button"
          className="tf-action-confirmation-stepper__cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="tf-action-confirmation-stepper__confirm"
          onClick={onConfirm}
          disabled={!allAcknowledged}
        >
          Confirm ({steps.filter((s) => s.acknowledged).length}/{steps.length})
        </button>
      </div>
    </div>
  );
};

export default ActionConfirmationStepper;
