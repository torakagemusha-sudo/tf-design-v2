import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldRegex — regex input with inline tester.
 *
 * @example
 * <FormFieldRegex name="pattern" label="Pattern" value="^[a-z]+$" testString="hello" onChange={handleChange} />
 */
export interface FormFieldRegexProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  testString?: string;
  onTestStringChange?: (val: string) => void;
  flags?: string;
  onFlagsChange?: (flags: string) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
}

export const FormFieldRegex: React.FC<FormFieldRegexProps> = ({
  name,
  label,
  value = "",
  onChange,
  testString = "",
  onTestStringChange,
  flags = "",
  onFlagsChange,
  error,
  disabled = false,
  readonly = false,
  className = "",
  style,
  ...rest
}) => {
  const testResult = useMemo(() => {
    if (!value || !testString) return null;
    try {
      const regex = new RegExp(value, flags);
      const matches = regex.test(testString);
      const matchArr = testString.match(regex);
      return { valid: true, matches, groups: matchArr };
    } catch (e) {
      return { valid: false, matches: false, error: e instanceof Error ? e.message : "Invalid regex" };
    }
  }, [value, testString, flags]);

  return (
    <div className={`tf-form-field-regex ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-regex-${name}`} {...rest}>
      {label && <label className="tf-form-field__label">{label}</label>}
      <div className="tf-form-field-regex__pattern">
        <span className="tf-form-field-regex__delimiter">/</span>
        <input
          className="tf-form-field-regex__input"
          type="text"
          name={name}
          value={value}
          onChange={e => onChange(name, e.target.value)}
          placeholder="Enter pattern"
          disabled={disabled}
          readOnly={readonly}
        />
        <span className="tf-form-field-regex__delimiter">/</span>
        <input
          className="tf-form-field-regex__flags"
          type="text"
          value={flags}
          onChange={e => onFlagsChange?.(e.target.value)}
          placeholder="gi"
          disabled={disabled}
        />
      </div>
      {onTestStringChange && (
        <div className="tf-form-field-regex__tester">
          <input
            className="tf-form-field-regex__test-input"
            type="text"
            value={testString}
            onChange={e => onTestStringChange(e.target.value)}
            placeholder="Test string..."
          />
          {testResult && (
            <span className={`tf-form-field-regex__result ${testResult.matches ? "tf-form-field-regex__result--match" : "tf-form-field-regex__result--no-match"}`}>
              {testResult.valid ? (testResult.matches ? "✓ Match" : "✗ No match") : `⚠ ${testResult.error}`}
            </span>
          )}
        </div>
      )}
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldRegex.displayName = "FormFieldRegex";
export default FormFieldRegex;
