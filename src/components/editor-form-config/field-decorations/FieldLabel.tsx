import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FieldLabel — consistent field label with optional required indicator.
 *
 * @example
 * <FieldLabel htmlFor="name" text="Full Name" required />
 */
export interface FieldLabelProps extends BaseComponentProps {
  htmlFor?: string;
  text: string;
  required?: boolean;
  /** Optional icon */
  icon?: ReactNode;
  /** Tooltip/help text */
  tooltip?: string;
}

export const FieldLabel: React.FC<FieldLabelProps> = ({
  htmlFor,
  text,
  required = false,
  icon,
  tooltip,
  className = "",
  style,
  ...rest
}) => (
  <label className={`tf-field-label ${required ? "tf-field-label--required" : ""} ${className}`} htmlFor={htmlFor} style={style} data-testid="field-label" {...rest}>
    {icon && <span className="tf-field-label__icon">{icon}</span>}
    <span className="tf-field-label__text">{text}</span>
    {required && <FieldRequiredIndicator />}
    {tooltip && (
      <span className="tf-field-label__tooltip" title={tooltip}>
        <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" stroke="currentColor" fill="none" strokeWidth="1"/><path d="M6 3.5v1M6 5.5v2" stroke="currentColor" strokeWidth="1"/></svg>
      </span>
    )}
  </label>
);

FieldLabel.displayName = "FieldLabel";
export default FieldLabel;
