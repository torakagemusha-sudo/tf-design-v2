import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormConditionalField — shows/hides children based on a condition function.
 *
 * @example
 * <FormConditionalField when={() => values.type === "custom"}>
 *   <FormField ... />
 * </FormConditionalField>
 */
export interface FormConditionalFieldProps extends BaseComponentProps {
  when: () => boolean;
  children: ReactNode;
  /** Animate show/hide */
  animate?: boolean;
}

export const FormConditionalField: React.FC<FormConditionalFieldProps> = ({
  when,
  children,
  animate = false,
  className = "",
  style,
  ...rest
}) => {
  const [visible, setVisible] = useState(when);

  useEffect(() => {
    setVisible(when());
  }, [when]);

  if (!visible) return null;

  return (
    <div
      className={`tf-form-conditional-field ${animate ? "tf-form-conditional-field--animated" : ""} ${className}`}
      style={style}
      data-testid="form-conditional-field"
      {...rest}
    >
      {children}
    </div>
  );
};

FormConditionalField.displayName = "FormConditionalField";
export default FormConditionalField;
