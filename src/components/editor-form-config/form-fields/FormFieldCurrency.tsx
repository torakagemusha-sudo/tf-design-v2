import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { FormField } from "./FormField";

/**
 * FormFieldCurrency — currency input with symbol and formatting.
 *
 * @example
 * <FormFieldCurrency name="price" label="Price" value={99.99} currency="USD" onChange={handleChange} />
 */
export interface FormFieldCurrencyProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: number;
  onChange: (name: string, value: number) => void;
  currency?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  placeholder?: string;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", JPY: "¥", CNY: "¥", INR: "₹",
  CAD: "C$", AUD: "A$", CHF: "Fr", SEK: "kr", NOK: "kr", DKK: "kr",
};

export const FormFieldCurrency: React.FC<FormFieldCurrencyProps> = ({
  name,
  label,
  value,
  onChange,
  currency = "USD",
  error,
  disabled = false,
  readonly = false,
  required = false,
  min,
  max,
  placeholder = "0.00",
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-form-field-currency ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-currency-${name}`} {...rest}>
    {label && <label className="tf-form-field__label">{label}{required && <span className="tf-form-field__required">*</span>}</label>}
    <div className="tf-form-field-currency__wrap">
      <span className="tf-form-field-currency__symbol">{CURRENCY_SYMBOLS[currency] || currency}</span>
      <input
        className="tf-form-field-currency__input"
        type="number"
        name={name}
        value={value ?? ""}
        onChange={e => onChange(name, Number(e.target.value))}
        min={min}
        max={max}
        step="0.01"
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
      />
      <span className="tf-form-field-currency__code">{currency}</span>
    </div>
    {error && <span className="tf-form-field__error">{error}</span>}
  </div>
);

FormFieldCurrency.displayName = "FormFieldCurrency";
export default FormFieldCurrency;
