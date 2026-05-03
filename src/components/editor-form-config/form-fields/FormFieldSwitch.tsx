import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { FormField } from "./FormField";

/**
 * FormFieldSwitch — toggle switch for boolean values.
 *
 * @example
 * <FormFieldSwitch name="enabled" label="Enabled" checked={true} onChange={handleChange} />
 */
export interface FormFieldSwitchProps extends BaseComponentProps {
  name: string;
  label?: string;
  checked?: boolean;
  onChange: (name: string, checked: boolean) => void;
  description?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  /** Labels for on/off states */
  labels?: { on?: string; off?: string };
}

export const FormFieldSwitch: React.FC<FormFieldSwitchProps> = ({
  name,
  label,
  checked = false,
  onChange,
  description,
  error,
  disabled = false,
  readonly = false,
  size = "md",
  labels,
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-form-field-switch tf-form-field-switch--${size} ${checked ? "tf-form-field-switch--checked" : ""} ${error ? "tf-form-field-switch--error" : ""} ${className}`} style={style} data-testid={`form-field-switch-${name}`} {...rest}>
    <label className="tf-form-field-switch__label">
      <input
        className="tf-form-field-switch__input"
        type="checkbox"
        name={name}
        checked={checked}
        onChange={e => onChange(name, e.target.checked)}
        disabled={disabled || readonly}
      />
      <span className="tf-form-field-switch__track">
        <span className="tf-form-field-switch__thumb" />
      </span>
      <div className="tf-form-field-switch__text">
        {label && <span className="tf-form-field-switch__title">{label}</span>}
        {description && <span className="tf-form-field-switch__desc">{description}</span>}
      </div>
    </label>
    {labels && <span className="tf-form-field-switch__state-label">{checked ? labels.on : labels.off}</span>}
    {error && <span className="tf-form-field__error">{error}</span>}
  </div>
);

FormFieldSwitch.displayName = "FormFieldSwitch";
export default FormFieldSwitch;
