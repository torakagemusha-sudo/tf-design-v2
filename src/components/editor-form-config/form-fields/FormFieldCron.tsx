import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { FormField } from "./FormField";

/**
 * FormFieldCron — cron expression input with human-readable description.
 *
 * @example
 * <FormFieldCron name="schedule" label="Schedule" value="0 9 * * 1-5" onChange={handleChange} />
 */
export interface FormFieldCronProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  /** Quick presets */
  presets?: Array<{ label: string; expression: string }>;
}

const CRON_PRESETS = [
  { label: "Every minute", expression: "* * * * *" },
  { label: "Every hour", expression: "0 * * * *" },
  { label: "Daily at midnight", expression: "0 0 * * *" },
  { label: "Daily at 9am", expression: "0 9 * * *" },
  { label: "Weekdays at 9am", expression: "0 9 * * 1-5" },
  { label: "Weekly on Sunday", expression: "0 0 * * 0" },
];

export const FormFieldCron: React.FC<FormFieldCronProps> = ({
  name,
  label,
  value = "",
  onChange,
  error,
  disabled = false,
  readonly = false,
  presets = CRON_PRESETS,
  className = "",
  style,
  ...rest
}) => {
  const description = useMemo(() => {
    if (!value || value.trim().split(/\s+/).length !== 5) return "Invalid cron expression";
    const parts = value.trim().split(/\s+/);
    const [min, hour, dom, month, dow] = parts;
    return `Runs at minute ${min}, hour ${hour}, day ${dom}, month ${month}, weekday ${dow}`;
  }, [value]);

  return (
    <div className={`tf-form-field-cron ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-cron-${name}`} {...rest}>
      {label && <label className="tf-form-field__label">{label}</label>}
      <input
        className="tf-form-field-cron__input"
        type="text"
        name={name}
        value={value}
        onChange={e => onChange(name, e.target.value)}
        placeholder="* * * * *"
        disabled={disabled}
        readOnly={readonly}
      />
      {value && <span className="tf-form-field-cron__desc">{description}</span>}
      <div className="tf-form-field-cron__presets">
        {presets.map(p => (
          <button key={p.expression} type="button" className="tf-form-field-cron__preset" onClick={() => onChange(name, p.expression)}>
            {p.label}
          </button>
        ))}
      </div>
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldCron.displayName = "FormFieldCron";
export default FormFieldCron;
