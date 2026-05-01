import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormSubmitButton — submit button with validation state awareness.
 *
 * @example
 * <FormSubmitButton onSubmit={handleSubmit} canSubmit={true} submitting={false} />
 */
export interface FormSubmitButtonProps extends BaseComponentProps {
  onSubmit: (e?: React.FormEvent) => void;
  canSubmit?: boolean;
  submitting?: boolean;
  label?: string;
  submittingLabel?: string;
  variant?: "primary" | "secondary" | "danger";
}

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  onSubmit,
  canSubmit = true,
  submitting = false,
  label = "Submit",
  submittingLabel = "Submitting...",
  variant = "primary",
  className = "",
  style,
  ...rest
}) => (
  <button
    className={`tf-form-submit-btn tf-form-submit-btn--${variant} ${className}`}
    style={style}
    type="submit"
    disabled={!canSubmit || submitting}
    onClick={onSubmit}
    data-testid="form-submit-button"
    {...rest}
  >
    {submitting ? (
      <>
        <span className="tf-form-submit-btn__spinner" />
        {submittingLabel}
      </>
    ) : (
      label
    )}
  </button>
);

FormSubmitButton.displayName = "FormSubmitButton";
export default FormSubmitButton;
