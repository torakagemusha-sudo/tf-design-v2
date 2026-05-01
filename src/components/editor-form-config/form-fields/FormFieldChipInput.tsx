import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldChipInput — chip input with icons and colors, similar to tag input.
 *
 * @example
 * <FormFieldChipInput name="skills" label="Skills" values={["React","Node"]} onChange={handleChange} />
 */
export interface FormFieldChipInputProps extends BaseComponentProps {
  name: string;
  label?: string;
  values: Array<{ id: string; label: string; color?: string }>;
  onChange: (name: string, values: FormFieldChipInputProps["values"]) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  maxChips?: number;
  /** Available chip templates */
  chipOptions?: Array<{ label: string; color: string }>;
}

export const FormFieldChipInput: React.FC<FormFieldChipInputProps> = ({
  name,
  label,
  values,
  onChange,
  error,
  disabled = false,
  readonly = false,
  maxChips,
  chipOptions = [],
  className = "",
  style,
  ...rest
}) => {
  const [input, setInput] = useState("");

  const addChip = useCallback((label: string, color?: string) => {
    if (!label.trim() || (maxChips && values.length >= maxChips)) return;
    onChange(name, [...values, { id: `chip_${Date.now()}`, label: label.trim(), color }]);
    setInput("");
  }, [values, maxChips, onChange, name]);

  const removeChip = useCallback((id: string) => {
    onChange(name, values.filter(v => v.id !== id));
  }, [values, onChange, name]);

  return (
    <div className={`tf-form-field-chip-input ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-chip-input-${name}`} {...rest}>
      {label && <label className="tf-form-field__label">{label}</label>}
      <div className="tf-form-field-chip-input__chips">
        {values.map(chip => (
          <span key={chip.id} className="tf-form-field-chip-input__chip" style={{ backgroundColor: chip.color }}>
            {chip.label}
            {!readonly && <button type="button" className="tf-form-field-chip-input__remove" onClick={() => removeChip(chip.id)}>×</button>}
          </span>
        ))}
        {!readonly && (!maxChips || values.length < maxChips) && (
          <div className="tf-form-field-chip-input__input-wrap">
            <input
              className="tf-form-field-chip-input__input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addChip(input); } }}
              onBlur={() => input && addChip(input)}
              placeholder="Add..."
              disabled={disabled}
            />
          </div>
        )}
      </div>
      {chipOptions.length > 0 && (
        <div className="tf-form-field-chip-input__options">
          {chipOptions.map(opt => (
            <button key={opt.label} type="button" className="tf-form-field-chip-input__option" style={{ borderColor: opt.color }} onClick={() => addChip(opt.label, opt.color)}>
              + {opt.label}
            </button>
          ))}
        </div>
      )}
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldChipInput.displayName = "FormFieldChipInput";
export default FormFieldChipInput;
