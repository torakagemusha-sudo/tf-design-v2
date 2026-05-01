import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormValidator — form-level validator that runs validation rules against all values.
 *
 * @example
 * <FormValidator values={values} rules={validationRules} onValidationChange={setErrors}>
 *   {children}
 * </FormValidator>
 */
export interface FormValidatorProps extends BaseComponentProps {
  values: Record<string, unknown>;
  rules: Record<string, ValidationRule[]>;
  onValidationChange: (errors: Record<string, string>) => void;
  /** Validate mode */
  mode?: "onChange" | "onBlur" | "onSubmit";
  children: ReactNode;
}

export const FormValidator: React.FC<FormValidatorProps> = ({
  values,
  rules,
  onValidationChange,
  mode = "onChange",
  children,
  className = "",
  style,
  ...rest
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {};
    Object.entries(rules).forEach(([field, fieldRules]) => {
      const val = values[field];
      for (const rule of fieldRules) {
        if (rule.type === "required" && (val === undefined || val === "" || val === null)) {
          newErrors[field] = rule.message || `${field} is required`;
          break;
        }
        if (rule.type === "minLength" && typeof val === "string" && val.length < (rule.value as number)) {
          newErrors[field] = rule.message || `${field} must be at least ${rule.value} chars`;
          break;
        }
        if (rule.type === "pattern" && typeof val === "string" && !(new RegExp(rule.value as string).test(val))) {
          newErrors[field] = rule.message || `${field} format is invalid`;
          break;
        }
        if (rule.type === "custom" && rule.validator) {
          const result = rule.validator(val);
          if (result !== true) {
            newErrors[field] = typeof result === "string" ? result : `${field} is invalid`;
            break;
          }
        }
      }
    });
    setErrors(newErrors);
    onValidationChange(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, rules, onValidationChange]);

  useEffect(() => {
    if (mode === "onChange") validate();
  }, [values, mode, validate]);

  return (
    <div className={`tf-form-validator ${Object.keys(errors).length > 0 ? "tf-form-validator--has-errors" : ""} ${className}`} style={style} data-testid="form-validator" {...rest}>
      {children}
    </div>
  );
};

FormValidator.displayName = "FormValidator";
export default FormValidator;
