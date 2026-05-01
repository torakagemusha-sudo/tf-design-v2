import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldSlider — range slider for numeric values.
 *
 * @example
 * <FormFieldSlider name="volume" label="Volume" value={50} min={0} max={100} onChange={handleChange} />
 */
export interface FormFieldSliderProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (name: string, value: number) => void;
  error?: string;
  disabled?: boolean;
  showValue?: boolean;
  showTicks?: boolean;
  unit?: string;
}

export const FormFieldSlider: React.FC<FormFieldSliderProps> = ({
  name,
  label,
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  error,
  disabled = false,
  showValue = true,
  showTicks = false,
  unit = "",
  className = "",
  style,
  ...rest
}) => {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={`tf-form-field-slider ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-slider-${name}`} {...rest}>
      <div className="tf-form-field-slider__header">
        {label && <label className="tf-form-field__label">{label}</label>}
        {showValue && <span className="tf-form-field-slider__value">{value}{unit}</span>}
      </div>
      <div className="tf-form-field-slider__track-wrap">
        <div className="tf-form-field-slider__track">
          <div className="tf-form-field-slider__fill" style={{ width: `${pct}%` }} />
        </div>
        <input
          className="tf-form-field-slider__input"
          type="range"
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(name, Number(e.target.value))}
          disabled={disabled}
        />
      </div>
      {showTicks && (
        <div className="tf-form-field-slider__ticks">
          <span>{min}{unit}</span>
          <span>{Math.round((min + max) / 2)}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      )}
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldSlider.displayName = "FormFieldSlider";
export default FormFieldSlider;
