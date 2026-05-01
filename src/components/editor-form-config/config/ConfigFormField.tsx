import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * ConfigFormField — form field wrapper that maps field config to the appropriate input.
 *
 * @example
 * <ConfigFormField config={fieldConfig} value="hello" onChange={handleChange} error="Required" />
 */
export interface ConfigFormFieldProps extends BaseComponentProps {
  /** Field configuration */
  config: FormFieldConfig;
  /** Current value */
  value: unknown;
  /** Change handler */
  onChange: (name: string, value: unknown) => void;
  /** Validation error */
  error?: string;
  /** Readonly override */
  readonly?: boolean;
}

export const ConfigFormField: React.FC<ConfigFormFieldProps> = ({
  config,
  value,
  onChange,
  error,
  readonly: readonlyOverride,
  className = "",
  style,
  ...rest
}) => {
  const isReadonly = readonlyOverride || config.readonly;
  const fieldId = `tf-cff-${config.name}`;

  const handleChange = useCallback((val: unknown) => {
    onChange(config.name, val);
  }, [config.name, onChange]);

  const widthClass = config.width ? `tf-config-form-field--${config.width}` : "tf-config-form-field--full";
  const sizeClass = config.size ? `tf-config-form-field--${config.size}` : "tf-config-form-field--md";

  return (
    <div
      className={`tf-config-form-field ${widthClass} ${sizeClass} ${error ? "tf-config-form-field--error" : ""} ${config.hidden ? "tf-config-form-field--hidden" : ""} ${className}`}
      style={style}
      data-testid={`config-form-field-${config.name}`}
      {...rest}
    >
      <label className="tf-config-form-field__label" htmlFor={fieldId}>
        {config.label}
        {config.required && <span className="tf-config-form-field__required">*</span>}
      </label>
      {config.description && <span className="tf-config-form-field__description">{config.description}</span>}
      <div className="tf-config-form-field__control">
        <input
          id={fieldId}
          className="tf-config-form-field__input"
          type={config.type === "number" ? "number" : config.type === "email" ? "email" : config.type === "url" ? "url" : "text"}
          value={String(value ?? "")}
          placeholder={config.placeholder}
          onChange={e => handleChange(e.target.type === "number" ? Number(e.target.value) : e.target.value)}
          readOnly={isReadonly}
          disabled={config.disabled}
          autoComplete={config.autoComplete}
        />
      </div>
      {error && <span className="tf-config-form-field__error">{error}</span>}
    </div>
  );
};

ConfigFormField.displayName = "ConfigFormField";
export default ConfigFormField;
