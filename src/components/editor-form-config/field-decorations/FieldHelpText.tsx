import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FieldHelpText — contextual help text displayed beneath a field.
 *
 * @example
 * <FieldHelpText text="Use 8+ characters with symbols" />
 */
export interface FieldHelpTextProps extends BaseComponentProps {
  /** Help text content */
  text: string;
  /** Tooltip variant (icon-only or inline) */
  variant?: "inline" | "tooltip";
  /** Icon element */
  icon?: ReactNode;
}

export const FieldHelpText: React.FC<FieldHelpTextProps> = ({
  text,
  variant = "inline",
  icon,
  className = "",
  style,
  ...rest
}) => (
  <span className={`tf-field-help-text tf-field-help-text--${variant} ${className}`} style={style} data-testid="field-help-text" {...rest}>
    {icon || <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" stroke="currentColor" fill="none" strokeWidth="1"/><path d="M6 3.5v1M6 5.5v2.5" stroke="currentColor" strokeWidth="1"/></svg>}
    <span className="tf-field-help-text__content">{text}</span>
  </span>
);

FieldHelpText.displayName = "FieldHelpText";
export default FieldHelpText;
