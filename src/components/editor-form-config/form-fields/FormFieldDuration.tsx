import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldDuration — duration input with segmented fields (days, hours, minutes).
 *
 * @example
 * <FormFieldDuration name="ttl" label="TTL" value={{days:1,hours:2}} onChange={handleChange} />
 */
export interface FormFieldDurationProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: DurationValue;
  onChange: (name: string, value: DurationValue) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  /** Which segments to show */
  segments?: Array<"years" | "months" | "days" | "hours" | "minutes" | "seconds">;
}

export const FormFieldDuration: React.FC<FormFieldDurationProps> = ({
  name,
  label,
  value = {},
  onChange,
  error,
  disabled = false,
  readonly = false,
  segments = ["days", "hours", "minutes"],
  className = "",
  style,
  ...rest
}) => {
  const update = useCallback((key: keyof DurationValue, val: number) => {
    onChange(name, { ...value, [key]: val });
  }, [name, value, onChange]);

  const labels: Record<string, string> = { years: "Y", months: "Mo", days: "D", hours: "H", minutes: "M", seconds: "S" };

  return (
    <div className={`tf-form-field-duration ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-duration-${name}`} {...rest}>
      {label && <label className="tf-form-field__label">{label}</label>}
      <div className="tf-form-field-duration__inputs">
        {segments.map(seg => (
          <div key={seg} className="tf-form-field-duration__segment">
            <input
              className="tf-form-field-duration__input"
              type="number"
              min={0}
              value={value[seg] ?? ""}
              onChange={e => update(seg, Number(e.target.value))}
              disabled={disabled}
              readOnly={readonly}
            />
            <span className="tf-form-field-duration__label">{labels[seg]}</span>
          </div>
        ))}
      </div>
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldDuration.displayName = "FormFieldDuration";
export default FormFieldDuration;
