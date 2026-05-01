import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldEmail — email input with format validation.
 *
 * @example
 * <FormFieldEmail name="email" label="Email" value="user@example.com" onChange={handleChange} />
 */
export interface FormFieldEmailProps extends Omit<FormFieldProps, "type"> {
  /** Allow multiple comma-separated emails */
  multiple?: boolean;
}

export const FormFieldEmail: React.FC<FormFieldEmailProps> = (props) => (
  <FormField {...props} type="email" className={`tf-form-field-email ${props.className || ""}`} />
);

FormFieldEmail.displayName = "FormFieldEmail";
export default FormFieldEmail;
