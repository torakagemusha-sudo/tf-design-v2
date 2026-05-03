import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import type { FormFieldProps } from "./formFieldTypes";
import { FormField } from "./FormField";

/**
 * FormFieldNumber — number input with min/max and step support.
 *
 * @example
 * <FormFieldNumber name="age" label="Age" value={25} min={0} max={120} onChange={handleChange} />
 */
export interface FormFieldNumberProps extends Omit<FormFieldProps, "type" | "value"> {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
}

export const FormFieldNumber: React.FC<FormFieldNumberProps> = ({
  value,
  min,
  max,
  step,
  ...props
}) => (
  <FormField
    {...props}
    type="number"
    value={value}
    inputProps={{ min, max, step }}
    className={`tf-form-field-number ${props.className || ""}`}
  />
);

FormFieldNumber.displayName = "FormFieldNumber";
export default FormFieldNumber;
