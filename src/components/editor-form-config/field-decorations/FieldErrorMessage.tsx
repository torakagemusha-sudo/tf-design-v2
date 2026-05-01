import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FieldErrorMessage — error message displayed below a field.
 *
 * @example
 * <FieldErrorMessage message="This field is required" />
 */
export interface FieldErrorMessageProps extends BaseComponentProps {
  message?: string;
  /** Show error icon */
  showIcon?: boolean;
}

export const FieldErrorMessage: React.FC<FieldErrorMessageProps> = ({
  message,
  showIcon = true,
  className = "",
  style,
  ...rest
}) => {
  if (!message) return null;

  return (
    <span className={`tf-field-error-message ${className}`} style={style} data-testid="field-error-message" {...rest}>
      {showIcon && (
        <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" stroke="currentColor" fill="none" strokeWidth="1.2"/><path d="M6 3.5v2.5M6 7.5v0.5" stroke="currentColor" strokeWidth="1.2"/></svg>
      )}
      {message}
    </span>
  );
};

FieldErrorMessage.displayName = "FieldErrorMessage";
export default FieldErrorMessage;
