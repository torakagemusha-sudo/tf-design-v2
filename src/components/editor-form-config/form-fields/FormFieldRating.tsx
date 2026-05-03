import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { FormField } from "./FormField";

/**
 * FormFieldRating — star rating input.
 *
 * @example
 * <FormFieldRating name="rating" label="Rating" value={4} max={5} onChange={handleChange} />
 */
export interface FormFieldRatingProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: number;
  onChange: (name: string, value: number) => void;
  max?: number;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  /** Allow half-star ratings */
  allowHalf?: boolean;
  size?: "sm" | "md" | "lg";
}

export const FormFieldRating: React.FC<FormFieldRatingProps> = ({
  name,
  label,
  value = 0,
  onChange,
  max = 5,
  error,
  disabled = false,
  readonly = false,
  allowHalf = false,
  size = "md",
  className = "",
  style,
  ...rest
}) => {
  const [hover, setHover] = useState(0);

  return (
    <div className={`tf-form-field-rating tf-form-field-rating--${size} ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-rating-${name}`} {...rest}>
      {label && <label className="tf-form-field__label">{label}</label>}
      <div className="tf-form-field-rating__stars">
        {Array.from({ length: max }, (_, i) => {
          const starVal = allowHalf ? (i + 0.5) : (i + 1);
          const filled = (hover || value) >= starVal;
          return (
            <button
              key={i}
              type="button"
              className={`tf-form-field-rating__star ${filled ? "tf-form-field-rating__star--filled" : ""}`}
              onClick={() => !readonly && onChange(name, starVal)}
              onMouseEnter={() => setHover(starVal)}
              onMouseLeave={() => setHover(0)}
              disabled={disabled || readonly}
            >
              ★
            </button>
          );
        })}
        <span className="tf-form-field-rating__value">{value > 0 ? value.toFixed(allowHalf ? 1 : 0) : "—"}/{max}</span>
      </div>
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldRating.displayName = "FormFieldRating";
export default FormFieldRating;
