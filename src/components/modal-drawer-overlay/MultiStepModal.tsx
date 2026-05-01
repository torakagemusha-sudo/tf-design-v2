import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { cn } from '@/utils/cn';
import { Modal } from './Modal';

/**
 * Multi-step wizard modal context for sharing step state.
 */
export interface MultiStepContextValue {
  /** Total number of steps. */
  totalSteps: number;
  /** Current active step (0-based). */
  currentStep: number;
  /** Navigate to a specific step. */
  goToStep: (step: number) => void;
  /** Advance to the next step. */
  nextStep: () => void;
  /** Go back to the previous step. */
  prevStep: () => void;
  /** Whether currently on the first step. */
  isFirstStep: boolean;
  /** Whether currently on the last step. */
  isLastStep: boolean;
  /** Whether the wizard can be completed. */
  canComplete: boolean;
  /** Step titles for the indicator. */
  stepTitles: string[];
}

const MultiStepContext = createContext<MultiStepContextValue | null>(null);

export const useMultiStep = (): MultiStepContextValue => {
  const ctx = useContext(MultiStepContext);
  if (!ctx) throw new Error('useMultiStep must be used within MultiStepModal');
  return ctx;
};

/**
 * MultiStepModal — wizard dialog with step indicators and navigation.
 * Manages step flow state and renders progress indicators.
 *
 * @example
 * ```tsx
 * <MultiStepModal
 *   isOpen={open}
 *   onClose={close}
 *   steps={['Configure', 'Review', 'Deploy']}
 *   currentStep={step}
 *   onStepChange={setStep}
 * >
 *   <StepOne />
 *   <StepTwo />
 *   <StepThree />
 * </MultiStepModal>
 * ```
 */
export interface MultiStepModalProps {
  /** Whether the modal is visible. */
  isOpen: boolean;
  /** Callback when modal is dismissed. */
  onClose: () => void;
  /** Step titles for the indicator bar. */
  steps: string[];
  /** Current active step index (0-based). */
  currentStep: number;
  /** Callback when the step changes. */
  onStepChange: (step: number) => void;
  /** Modal title. */
  title?: string;
  /** Whether the current step is valid — controls next/completion. */
  isStepValid?: boolean;
  /** Callback when wizard is completed. */
  onComplete?: () => void;
  /** Size variant. */
  size?: 'md' | 'lg' | 'xl';
  /** Additional class names. */
  className?: string;
  /** Child step components — render one per step. */
  children: React.ReactNode;
  /** Whether completion is in progress. */
  isCompleting?: boolean;
}

export const MultiStepModal: React.FC<MultiStepModalProps> = ({
  isOpen,
  onClose,
  steps,
  currentStep,
  onStepChange,
  title = 'Wizard',
  isStepValid = true,
  onComplete,
  size = 'lg',
  className,
  children,
  isCompleting,
}) => {
  const totalSteps = steps.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps) onStepChange(step);
    },
    [totalSteps, onStepChange]
  );

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) onStepChange(currentStep + 1);
  }, [currentStep, totalSteps, onStepChange]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) onStepChange(currentStep - 1);
  }, [currentStep, onStepChange]);

  const ctx = useMemo<MultiStepContextValue>(
    () => ({
      totalSteps,
      currentStep,
      goToStep,
      nextStep,
      prevStep,
      isFirstStep,
      isLastStep,
      canComplete: isStepValid,
      stepTitles: steps,
    }),
    [totalSteps, currentStep, goToStep, nextStep, prevStep, isFirstStep, isLastStep, isStepValid, steps]
  );

  const childArray = React.Children.toArray(children);
  const activeChild = childArray[currentStep];

  return (
    <MultiStepContext.Provider value={ctx}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        title={title}
        className={cn('tf-multi-step-modal', className)}
      >
        <MultiStepModalHeader title={title} />
        <MultiStepModalSteps
          steps={steps}
          currentStep={currentStep}
          onStepClick={goToStep}
        />
        <MultiStepModalBody>{activeChild}</MultiStepModalBody>
        <MultiStepModalFooter
          onComplete={isLastStep ? onComplete : undefined}
          isCompleting={isCompleting}
        />
      </Modal>
    </MultiStepContext.Provider>
  );
};

export default MultiStepModal;
