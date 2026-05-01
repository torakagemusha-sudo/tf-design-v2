import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldPassword — password input with show/hide toggle.
 *
 * @example
 * <FormFieldPassword name="password" label="Password" value="secret" onChange={handleChange} />
 */
export interface FormFieldPasswordProps extends Omit<FormFieldProps, "type"> {
  /** Show strength indicator */
  showStrength?: boolean;
  /** Minimum length requirement */
  minLength?: number;
}

export const FormFieldPassword: React.FC<FormFieldPasswordProps> = ({
  showStrength = false,
  minLength,
  ...props
}) => {
  const [visible, setVisible] = useState(false);
  const strength = useMemo(() => {
    if (!showStrength || !props.value) return 0;
    const v = String(props.value);
    let s = 0;
    if (v.length >= (minLength || 8)) s++;
    if (/[A-Z]/.test(v)) s++;
    if (/[0-9]/.test(v)) s++;
    if (/[^A-Za-z0-9]/.test(v)) s++;
    return s;
  }, [showStrength, props.value, minLength]);

  return (
    <div className={`tf-form-field-password ${props.className || ""}`} data-testid={`form-field-password-${props.name}`}>
      <FormField {...props} type={visible ? "text" : "password"} className="tf-form-field-password__field" />
      <button
        type="button"
        className="tf-form-field-password__toggle"
        onClick={() => setVisible(v => !v)}
        tabIndex={-1}
        title={visible ? "Hide" : "Show"}
      >
        {visible ? "🙈" : "👁️"}
      </button>
      {showStrength && props.value && (
        <div className="tf-form-field-password__strength">
          <div className="tf-form-field-password__strength-bar">
            {[1, 2, 3, 4].map(i => (
              <span key={i} className={`tf-form-field-password__strength-segment ${i <= strength ? `tf-form-field-password__strength-segment--${strength}` : ""}`} />
            ))}
          </div>
          <span className="tf-form-field-password__strength-label">
            {strength <= 1 ? "Weak" : strength === 2 ? "Fair" : strength === 3 ? "Good" : "Strong"}
          </span>
        </div>
      )}
    </div>
  );
};

FormFieldPassword.displayName = "FormFieldPassword";
export default FormFieldPassword;
