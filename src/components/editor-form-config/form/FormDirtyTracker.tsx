import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormDirtyTracker — tracks unsaved changes and warns on navigation.
 *
 * @example
 * <FormDirtyTracker isDirty={true} onConfirmNavigate={() => true} />
 */
export interface FormDirtyTrackerProps extends BaseComponentProps {
  /** Whether the form has unsaved changes */
  isDirty: boolean;
  /** Custom confirm dialog */
  onConfirmNavigate?: () => boolean;
  /** Warning message */
  message?: string;
}

export const FormDirtyTracker: React.FC<FormDirtyTrackerProps> = ({
  isDirty,
  onConfirmNavigate,
  message = "You have unsaved changes. Are you sure you want to leave?",
  className = "",
  style,
  ...rest
}) => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = message;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, message]);

  return (
    <div className={`tf-form-dirty-tracker ${isDirty ? "tf-form-dirty-tracker--dirty" : ""} ${className}`} style={style} data-testid="form-dirty-tracker" {...rest}>
      {isDirty && <span className="tf-form-dirty-tracker__badge" title={message}>●</span>}
    </div>
  );
};

FormDirtyTracker.displayName = "FormDirtyTracker";
export default FormDirtyTracker;
