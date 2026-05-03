import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import type { FormFieldProps } from "./formFieldTypes";
import { FormField } from "./FormField";

/**
 * FormFieldUrl — URL input with protocol validation.
 *
 * @example
 * <FormFieldUrl name="website" label="Website" value="https://example.com" onChange={handleChange} />
 */
export interface FormFieldUrlProps extends Omit<FormFieldProps, "type"> {
  /** Allowed protocols */
  allowedProtocols?: string[];
}

export const FormFieldUrl: React.FC<FormFieldUrlProps> = (props) => (
  <FormField {...props} type="url" className={`tf-form-field-url ${props.className || ""}`} />
);

FormFieldUrl.displayName = "FormFieldUrl";
export default FormFieldUrl;
