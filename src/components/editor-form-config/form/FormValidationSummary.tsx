import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormValidationSummary — displays a summary of all validation errors.
 *
 * @example
 * <FormValidationSummary errors={{name:"Required",email:"Invalid"}} onFieldClick={scrollToField} />
 */
export interface FormValidationSummaryProps extends BaseComponentProps {
  errors: Record<string, string>;
  onFieldClick?: (fieldName: string) => void;
  /** Title text */
  title?: string;
  /** Dismiss handler */
  onDismiss?: () => void;
}

export const FormValidationSummary: React.FC<FormValidationSummaryProps> = ({
  errors,
  onFieldClick,
  title = "Please fix the following errors:",
  onDismiss,
  className = "",
  style,
  ...rest
}) => {
  const entries = useMemo(() => Object.entries(errors), [errors]);
  if (entries.length === 0) return null;

  return (
    <div className={`tf-form-validation-summary ${className}`} style={style} data-testid="form-validation-summary" {...rest}>
      <div className="tf-form-validation-summary__header">
        <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" stroke="currentColor" fill="none" strokeWidth="1.2"/><path d="M7 4v3.5" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="10" r="0.5" fill="currentColor"/></svg>
        <span className="tf-form-validation-summary__title">{title}</span>
        {onDismiss && <button type="button" className="tf-form-validation-summary__dismiss" onClick={onDismiss}>×</button>}
      </div>
      <ul className="tf-form-validation-summary__list">
        {entries.map(([field, msg]) => (
          <li key={field} className="tf-form-validation-summary__item">
            {onFieldClick ? (
              <button type="button" className="tf-form-validation-summary__field-btn" onClick={() => onFieldClick(field)}>
                <span className="tf-form-validation-summary__field">{field}</span>
                <span className="tf-form-validation-summary__message">{msg}</span>
              </button>
            ) : (
              <>
                <span className="tf-form-validation-summary__field">{field}</span>
                <span className="tf-form-validation-summary__message">{msg}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

FormValidationSummary.displayName = "FormValidationSummary";
export default FormValidationSummary;
