import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormStepHeader — step indicator for multi-step form navigation.
 *
 * @example
 * <FormStepHeader index={0} label="Basic" active completed onClick={() => setStep(0)} />
 */
export interface FormStepHeaderProps extends BaseComponentProps {
  index: number;
  label: string;
  description?: string;
  active?: boolean;
  completed?: boolean;
  optional?: boolean;
  showNumber?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export const FormStepHeader: React.FC<FormStepHeaderProps> = ({
  index,
  label,
  description,
  active = false,
  completed = false,
  optional = false,
  showNumber = true,
  disabled = false,
  onClick,
  className = "",
  style,
  ...rest
}) => (
  <button
    className={`tf-form-step-header ${active ? "tf-form-step-header--active" : ""} ${completed ? "tf-form-step-header--completed" : ""} ${disabled ? "tf-form-step-header--disabled" : ""} ${className}`}
    style={style}
    onClick={onClick}
    disabled={disabled}
    type="button"
    data-testid={`form-step-header-${index}`}
    {...rest}
  >
    <span className={`tf-form-step-header__indicator ${active ? "tf-form-step-header__indicator--active" : ""} ${completed ? "tf-form-step-header__indicator--completed" : ""}`}>
      {completed ? (
        <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
      ) : showNumber ? (
        index + 1
      ) : null}
    </span>
    <span className="tf-form-step-header__text">
      <span className="tf-form-step-header__label">{label}</span>
      {optional && <span className="tf-form-step-header__optional">(optional)</span>}
      {description && <span className="tf-form-step-header__desc">{description}</span>}
    </span>
  </button>
);

FormStepHeader.displayName = "FormStepHeader";
export default FormStepHeader;
