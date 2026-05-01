import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormStep — single step within a multi-step form.
 *
 * @example
 * <FormStep stepId="basic" isActive>
 *   <FormField ... />
 * </FormStep>
 */
export interface FormStepProps extends BaseComponentProps {
  stepId: string;
  isActive?: boolean;
  children: ReactNode;
  /** Whether step is completed */
  isCompleted?: boolean;
}

export const FormStep: React.FC<FormStepProps> = ({
  stepId,
  isActive = false,
  children,
  isCompleted = false,
  className = "",
  style,
  ...rest
}) => {
  if (!isActive) return null;

  return (
    <div
      className={`tf-form-step ${isActive ? "tf-form-step--active" : ""} ${isCompleted ? "tf-form-step--completed" : ""} ${className}`}
      style={style}
      data-testid={`form-step-${stepId}`}
      {...rest}
    >
      {children}
    </div>
  );
};

FormStep.displayName = "FormStep";
export default FormStep;
