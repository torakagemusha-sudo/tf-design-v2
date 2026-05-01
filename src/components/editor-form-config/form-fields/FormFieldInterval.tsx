import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldInterval — time interval input with start and end times.
 *
 * @example
 * <FormFieldInterval name="hours" label="Business Hours" start="09:00" end="17:00" onChange={handleChange} />
 */
export interface FormFieldIntervalProps extends BaseComponentProps {
  name: string;
  label?: string;
  start?: string;
  end?: string;
  onChange: (name: string, interval: { start: string; end: string }) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
}

export const FormFieldInterval: React.FC<FormFieldIntervalProps> = ({
  name,
  label,
  start = "",
  end = "",
  onChange,
  error,
  disabled = false,
  readonly = false,
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-form-field-interval ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-interval-${name}`} {...rest}>
    {label && <label className="tf-form-field__label">{label}</label>}
    <div className="tf-form-field-interval__inputs">
      <input
        className="tf-form-field-interval__input"
        type="time"
        value={start}
        onChange={e => onChange(name, { start: e.target.value, end })}
        disabled={disabled}
        readOnly={readonly}
      />
      <span className="tf-form-field-interval__sep">to</span>
      <input
        className="tf-form-field-interval__input"
        type="time"
        value={end}
        onChange={e => onChange(name, { start, end: e.target.value })}
        disabled={disabled}
        readOnly={readonly}
      />
    </div>
    {error && <span className="tf-form-field__error">{error}</span>}
  </div>
);

FormFieldInterval.displayName = "FormFieldInterval";
export default FormFieldInterval;
