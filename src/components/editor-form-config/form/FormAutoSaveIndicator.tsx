import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormAutoSaveIndicator — shows auto-save status (saving, saved, error).
 *
 * @example
 * <FormAutoSaveIndicator status="saved" lastSaved={Date.now()} />
 */
export interface FormAutoSaveIndicatorProps extends BaseComponentProps {
  status: "idle" | "saving" | "saved" | "error";
  lastSaved?: number;
  errorMessage?: string;
  /** Format the saved timestamp */
  formatTime?: (timestamp: number) => string;
}

export const FormAutoSaveIndicator: React.FC<FormAutoSaveIndicatorProps> = ({
  status,
  lastSaved,
  errorMessage,
  formatTime,
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-form-auto-save-indicator tf-form-auto-save-indicator--${status} ${className}`} style={style} data-testid="form-auto-save-indicator" {...rest}>
    {status === "saving" && (
      <>
        <span className="tf-form-auto-save-indicator__spinner" />
        <span className="tf-form-auto-save-indicator__text">Saving...</span>
      </>
    )}
    {status === "saved" && (
      <>
        <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
        <span className="tf-form-auto-save-indicator__text">
          Saved{lastSaved ? ` at ${formatTime ? formatTime(lastSaved) : new Date(lastSaved).toLocaleTimeString()}` : ""}
        </span>
      </>
    )}
    {status === "error" && (
      <>
        <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" stroke="currentColor" fill="none" strokeWidth="1.2"/><path d="M6 3.5v3" stroke="currentColor" strokeWidth="1.2"/><circle cx="6" cy="9" r="0.4" fill="currentColor"/></svg>
        <span className="tf-form-auto-save-indicator__text">{errorMessage || "Save failed"}</span>
      </>
    )}
  </div>
);

FormAutoSaveIndicator.displayName = "FormAutoSaveIndicator";
export default FormAutoSaveIndicator;
