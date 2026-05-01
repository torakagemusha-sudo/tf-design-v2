import React from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * A single step in the wizard flow.
 */
export interface WizardStep {
  id: string;
  label: string;
  description?: string;
  content: React.ReactNode;
  canProceed?: boolean;
  canGoBack?: boolean;
}

/**
 * Props for the MultiStepCommandWizard component.
 * Wizard flow for complex multi-step commands.
 */
export interface MultiStepCommandWizardProps extends TorafirmaComponentBaseProps {
  /** Array of wizard steps */
  steps: WizardStep[];
  /** Index of the currently active step */
  currentStep: number;
  /** Callback fired when a step navigation is requested */
  onStep: (stepIndex: number) => void;
  /** Callback fired when the wizard is completed */
  onComplete: () => void;
  /** Callback fired when the wizard is cancelled */
  onCancel?: () => void;
}

/**
 * MultiStepCommandWizard — wizard flow for complex multi-step commands.
 *
 * Guides operators through multi-stage commands with explicit
 * step progression. Each step is validated before allowing
 * advancement. Provides a stepper header and back/forward
 * navigation controls.
 *
 * @example
 * ```tsx
 * <MultiStepCommandWizard
 *   steps={[
 *     { id: 'configure', label: 'Configure', description: 'Set parameters', content: <ConfigPanel />, canProceed: true },
 *     { id: 'validate', label: 'Validate', description: 'Verify inputs', content: <ValidationPanel />, canProceed: true },
 *     { id: 'confirm', label: 'Confirm', description: 'Review and execute', content: <ConfirmPanel />, canProceed: true },
 *   ]}
 *   currentStep={0}
 *   onStep={(idx) => console.log('Step', idx)}
 *   onComplete={() => console.log('Complete')}
 * />
 * ```
 */
const MultiStepCommandWizard: React.FC<MultiStepCommandWizardProps> = ({
  steps,
  currentStep,
  onStep,
  onComplete,
  onCancel,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const activeStep = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  return (
    <div className={`tf-multi-step-command-wizard ${className}`} data-testid={testId} {...rest}>
      <nav className="tf-multi-step-command-wizard__stepper" aria-label="Wizard progress">
        <ol className="tf-multi-step-command-wizard__step-list">
          {steps.map((step, index) => {
            const stepState =
              index < currentStep ? 'completed' : index === currentStep ? 'active' : 'pending';
            return (
              <li
                key={step.id}
                className={`tf-multi-step-command-wizard__step-item tf-multi-step-command-wizard__step-item--${stepState}`}
              >
                <button
                  type="button"
                  className="tf-multi-step-command-wizard__step-button"
                  onClick={() => index <= currentStep && onStep(index)}
                  disabled={index > currentStep}
                  aria-current={index === currentStep ? 'step' : undefined}
                  aria-label={`Step ${index + 1}: ${step.label}`}
                >
                  <span className="tf-multi-step-command-wizard__step-number">{index + 1}</span>
                  <span className="tf-multi-step-command-wizard__step-label">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <span className="tf-multi-step-command-wizard__step-connector" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {activeStep && (
        <div className="tf-multi-step-command-wizard__content">
          {activeStep.description && (
            <p className="tf-multi-step-command-wizard__description">{activeStep.description}</p>
          )}
          <div className="tf-multi-step-command-wizard__body">{activeStep.content}</div>
        </div>
      )}

      <div className="tf-multi-step-command-wizard__footer">
        {onCancel && (
          <button
            type="button"
            className="tf-multi-step-command-wizard__cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          className="tf-multi-step-command-wizard__back"
          onClick={() => onStep(currentStep - 1)}
          disabled={isFirst}
        >
          Back
        </button>
        {isLast ? (
          <button
            type="button"
            className="tf-multi-step-command-wizard__complete"
            onClick={onComplete}
            disabled={!activeStep?.canProceed}
          >
            Execute
          </button>
        ) : (
          <button
            type="button"
            className="tf-multi-step-command-wizard__next"
            onClick={() => onStep(currentStep + 1)}
            disabled={!activeStep?.canProceed}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepCommandWizard;
