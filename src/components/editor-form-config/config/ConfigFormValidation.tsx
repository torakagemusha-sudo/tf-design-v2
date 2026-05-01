import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * ConfigFormValidation — form validation summary display.
 * Shows all validation errors grouped by section.
 *
 * @example
 * <ConfigFormValidation errors={{name: "Required", port: "Invalid"}} onNavigate={scrollToField} />
 */
export interface ConfigFormValidationProps extends BaseComponentProps {
  /** Errors keyed by field name */
  errors: Record<string, string>;
  /** Navigate to field handler */
  onNavigate?: (fieldName: string) => void;
  /** Section mapping for grouping errors */
  sectionMap?: Record<string, string>;
  /** Whether to auto-scroll on error */
  autoScroll?: boolean;
}

export const ConfigFormValidation: React.FC<ConfigFormValidationProps> = ({
  errors,
  onNavigate,
  sectionMap = {},
  autoScroll = false,
  className = "",
  style,
  ...rest
}) => {
  const errorEntries = useMemo(() => Object.entries(errors), [errors]);

  useEffect(() => {
    if (autoScroll && errorEntries.length > 0) {
      const el = document.querySelector("[data-testid=\"config-form-validation\"]");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [autoScroll, errorEntries.length]);

  if (errorEntries.length === 0) return null;

  return (
    <div
      className={`tf-config-form-validation tf-config-form-validation--visible ${className}`}
      style={style}
      data-testid="config-form-validation"
      {...rest}
    >
      <div className="tf-config-form-validation__header">
        <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" stroke="currentColor" fill="none" strokeWidth="1.2"/><path d="M7 4v3.5" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="10" r="0.5" fill="currentColor"/></svg>
        <span className="tf-config-form-validation__title">{errorEntries.length} validation error{errorEntries.length !== 1 ? "s" : ""}</span>
      </div>
      <ul className="tf-config-form-validation__list">
        {errorEntries.map(([field, msg]) => (
          <li key={field} className="tf-config-form-validation__item">
            <button
              className="tf-config-form-validation__navigate"
              onClick={() => onNavigate?.(field)}
              type="button"
            >
              <span className="tf-config-form-validation__field">{field}</span>
              <span className="tf-config-form-validation__sep">—</span>
              <span className="tf-config-form-validation__message">{msg}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ConfigFormValidation.displayName = "ConfigFormValidation";
export default ConfigFormValidation;
