import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldTel — telephone input with formatting support.
 *
 * @example
 * <FormFieldTel name="phone" label="Phone" value="+1-555-123-4567" onChange={handleChange} />
 */
export interface FormFieldTelProps extends Omit<FormFieldProps, "type"> {
  /** Phone number format pattern */
  format?: string;
  /** Country code prefix */
  countryCode?: string;
}

export const FormFieldTel: React.FC<FormFieldTelProps> = (props) => (
  <FormField {...props} type="tel" className={`tf-form-field-tel ${props.className || ""}`} />
);

FormFieldTel.displayName = "FormFieldTel";
export default FormFieldTel;
