import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import type { FormFieldProps } from "./formFieldTypes";
import { FormField } from "./FormField";
/**
 * FormFieldText — text input field with standard text validation.
 *
 * @example
 * <FormFieldText name="username" label="Username" value="john" onChange={handleChange} />
 */
export interface FormFieldTextProps extends Omit<FormFieldProps, "type"> {}

export const FormFieldText: React.FC<FormFieldTextProps> = (props) => (
  <FormField {...props} type="text" className={`tf-form-field-text ${props.className || ""}`} />
);

FormFieldText.displayName = "FormFieldText";
export default FormFieldText;
