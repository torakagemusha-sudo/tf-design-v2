import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * PropertyPanelField — individual property field with full type support.
 * Renders the appropriate input control based on property definition.
 *
 * @example
 * <PropertyPanelField property={propDef} onChange={(k, v) => console.log(k, v)} />
 */
export interface PropertyPanelFieldProps extends BaseComponentProps {
  /** Property definition to render */
  property: PropertyDefinition;
  /** Change callback */
  onChange: (key: string, value: unknown) => void;
  /** Blur callback */
  onBlur?: (key: string, value: unknown) => void;
  /** Validation error message */
  error?: string;
  /** Field size */
  size?: "sm" | "md" | "lg";
}

export const PropertyPanelField: React.FC<PropertyPanelFieldProps> = ({
  property,
  onChange,
  onBlur,
  error,
  size = "md",
  className = "",
  style,
  ...rest
}) => {
  const inputId = `tf-ppf-${property.key}`;
  const [localError, setLocalError] = useState<string | undefined>(error);

  useEffect(() => { setLocalError(error); }, [error]);

  const validate = useCallback((val: unknown) => {
    if (property.validation) {
      for (const rule of property.validation) {
        if (rule.type === "required" && (val === undefined || val === "" || val === null)) {
          return rule.message || `${property.label} is required`;
        }
        if (rule.type === "minLength" && typeof val === "string" && val.length < (rule.value as number)) {
          return rule.message || `${property.label} must be at least ${rule.value} characters`;
        }
        if (rule.type === "pattern" && typeof val === "string" && !(new RegExp(rule.value as string).test(val))) {
          return rule.message || `${property.label} format is invalid`;
        }
      }
    }
    return undefined;
  }, [property.validation, property.label]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    let val: unknown = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    if (property.type === "number") val = Number(val);
    const err = validate(val);
    setLocalError(err);
    onChange(property.key, val);
  }, [onChange, property.key, property.type, validate]);

  const handleBlur = useCallback(() => {
    const err = validate(property.value);
    setLocalError(err);
    onBlur?.(property.key, property.value);
  }, [property.value, property.key, validate, onBlur]);

  const inputClasses = `tf-property-panel-field tf-property-panel-field--${property.type} tf-property-panel-field--${size} ${localError ? "tf-property-panel-field--error" : ""} ${property.disabled ? "tf-property-panel-field--disabled" : ""} ${className}`;

  return (
    <div className={inputClasses} style={style} data-testid="property-panel-field" {...rest}>
      <label className="tf-property-panel-field__label" htmlFor={inputId}>
        {property.label}
        {property.required && <span className="tf-property-panel-field__required">*</span>}
      </label>
      {property.description && <span className="tf-property-panel-field__description">{property.description}</span>}

      {property.type === "select" && property.options ? (
        <select
          id={inputId}
          className={`tf-property-panel-field__input tf-property-panel-field__input--select tf-property-panel-field__input--${size}`}
          value={String(property.value ?? "")}
          onChange={handleChange}
          disabled={property.disabled}
        >
          {property.options.map(opt => (
            <option key={String(opt.value)} value={String(opt.value)}>{opt.label}</option>
          ))}
        </select>
      ) : property.type === "boolean" ? (
        <label className="tf-property-panel-field__toggle">
          <input
            id={inputId}
            type="checkbox"
            className="tf-property-panel-field__toggle-input"
            checked={!!property.value}
            onChange={handleChange}
            disabled={property.disabled}
          />
          <span className="tf-property-panel-field__toggle-track">
            <span className="tf-property-panel-field__toggle-thumb" />
          </span>
        </label>
      ) : property.type === "json" || property.type === "code" ? (
        <textarea
          id={inputId}
          className={`tf-property-panel-field__input tf-property-panel-field__input--textarea tf-property-panel-field__input--${size}`}
          value={typeof property.value === "object" ? JSON.stringify(property.value, null, 2) : String(property.value ?? "")}
          placeholder={property.placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          readOnly={property.readonly}
          disabled={property.disabled}
          rows={6}
        />
      ) : property.type === "color" ? (
        <div className="tf-property-panel-field__color-wrap">
          <input
            id={inputId}
            type="color"
            className={`tf-property-panel-field__input tf-property-panel-field__input--color tf-property-panel-field__input--${size}`}
            value={String(property.value ?? "#000000")}
            onChange={handleChange}
            disabled={property.disabled}
          />
          <input
            className={`tf-property-panel-field__input tf-property-panel-field__input--text tf-property-panel-field__input--${size}`}
            value={String(property.value ?? "")}
            onChange={handleChange}
            placeholder="#RRGGBB"
          />
        </div>
      ) : (
        <input
          id={inputId}
          type={property.type === "number" ? "number" : property.type === "email" ? "email" : property.type === "url" ? "url" : "text"}
          className={`tf-property-panel-field__input tf-property-panel-field__input--${size}`}
          value={String(property.value ?? "")}
          placeholder={property.placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          readOnly={property.readonly}
          disabled={property.disabled}
        />
      )}

      {localError && <span className="tf-property-panel-field__error">{localError}</span>}
    </div>
  );
};

PropertyPanelField.displayName = "PropertyPanelField";
export default PropertyPanelField;
