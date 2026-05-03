import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { FormField } from "./FormField";

/**
 * FormFieldColor — color picker with hex input.
 *
 * @example
 * <FormFieldColor name="theme" label="Theme Color" value="#3b82f6" onChange={handleChange} />
 */
export interface FormFieldColorProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  /** Preset color swatches */
  presets?: string[];
}

export const FormFieldColor: React.FC<FormFieldColorProps> = ({
  name,
  label,
  value = "#000000",
  onChange,
  error,
  disabled = false,
  readonly = false,
  presets,
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-form-field-color ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-color-${name}`} {...rest}>
    {label && <label className="tf-form-field__label">{label}</label>}
    <div className="tf-form-field-color__wrap">
      <input
        className="tf-form-field-color__picker"
        type="color"
        name={name}
        value={value}
        onChange={e => onChange(name, e.target.value)}
        disabled={disabled}
      />
      <input
        className="tf-form-field-color__text"
        type="text"
        value={value}
        onChange={e => onChange(name, e.target.value)}
        placeholder="#RRGGBB"
        disabled={disabled || readonly}
        maxLength={7}
      />
      <span className="tf-form-field-color__swatch" style={{ backgroundColor: value }} />
    </div>
    {presets && (
      <div className="tf-form-field-color__presets">
        {presets.map(c => (
          <button key={c} className="tf-form-field-color__preset" style={{ backgroundColor: c }} onClick={() => onChange(name, c)} type="button" title={c} />
        ))}
      </div>
    )}
    {error && <span className="tf-form-field__error">{error}</span>}
  </div>
);

FormFieldColor.displayName = "FormFieldColor";
export default FormFieldColor;
