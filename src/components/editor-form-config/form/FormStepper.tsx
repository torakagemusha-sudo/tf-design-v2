import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormStepper — multi-step form container with step navigation.
 *
 * @example
 * <FormStepper steps={steps} currentStep={0} onStepChange={setStep}>
 *   <FormStep>...</FormStep>
 * </FormStepper>
 */
export interface FormStepperProps extends BaseComponentProps {
  steps: FormStepConfig[];
  currentStep: number;
  onStepChange: (step: number) => void;
  children: ReactNode;
  /** Enable linear mode (must complete steps in order) */
  linear?: boolean;
  /** Completed steps */
  completedSteps?: Set<string>;
  /** Show step numbers */
  showNumbers?: boolean;
}

export const FormStepper: React.FC<FormStepperProps> = ({
  steps,
  currentStep,
  onStepChange,
  children,
  linear = false,
  completedSteps = new Set(),
  showNumbers = true,
  className = "",
  style,
  ...rest
}) => {
  const canNavigate = useCallback((index: number) => {
    if (!linear) return true;
    if (index <= currentStep) return true;
    // Can navigate to next if current is completed
    if (index === currentStep + 1) return completedSteps.has(steps[currentStep]?.id);
    return false;
  }, [linear, currentStep, completedSteps, steps]);

  return (
    <div className={`tf-form-stepper ${className}`} style={style} data-testid="form-stepper" {...rest}>
      <div className="tf-form-stepper__header">
        {steps.map((step, i) => (
          <FormStepHeader
            key={step.id}
            index={i}
            label={step.label}
            description={step.description}
            active={i === currentStep}
            completed={completedSteps.has(step.id)}
            optional={step.optional}
            showNumber={showNumbers}
            disabled={!canNavigate(i)}
            onClick={() => canNavigate(i) && onStepChange(i)}
          />
        ))}
      </div>
      <div className="tf-form-stepper__content">
        {children}
      </div>
    </div>
  );
};

FormStepper.displayName = "FormStepper";
export default FormStepper;
