import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { ConfigFormField } from "./ConfigFormField";

/**
 * ConfigFormObjectField — nested object field for configuration forms.
 *
 * @example
 * <ConfigFormObjectField label="Database" schema={dbSchema} value={dbConfig} onChange={setDbConfig} />
 */
export interface ConfigFormObjectFieldProps extends BaseComponentProps {
  /** Field label */
  label: string;
  /** Object schema (nested fields) */
  schema: FormFieldConfig[];
  /** Current object value */
  value: Record<string, unknown>;
  /** Change handler */
  onChange: (value: Record<string, unknown>) => void;
  /** Readonly */
  readonly?: boolean;
  /** Errors keyed by nested field name */
  errors?: Record<string, string>;
}

export const ConfigFormObjectField: React.FC<ConfigFormObjectFieldProps> = ({
  label,
  schema,
  value,
  onChange,
  readonly = false,
  errors = {},
  className = "",
  style,
  ...rest
}) => {
  const handleFieldChange = useCallback((name: string, fieldValue: unknown) => {
    onChange({ ...value, [name]: fieldValue });
  }, [value, onChange]);

  return (
    <div className={`tf-config-form-object-field ${className}`} style={style} data-testid="config-form-object-field" {...rest}>
      <label className="tf-config-form-object-field__label">{label}</label>
      <div className="tf-config-form-object-field__fields">
        {schema.map(field => (
          <ConfigFormField
            key={field.name}
            config={field}
            value={value[field.name]}
            onChange={handleFieldChange}
            error={errors[field.name]}
            readonly={readonly}
          />
        ))}
      </div>
    </div>
  );
};

ConfigFormObjectField.displayName = "ConfigFormObjectField";
export default ConfigFormObjectField;
