import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * ConfigFormArrayField — array/repeated field for configuration forms.
 * Allows adding, removing, and reordering repeated values.
 *
 * @example
 * <ConfigFormArrayField label="Tags" values={["a","b"]} onChange={setTags} renderItem={render} />
 */
export interface ConfigFormArrayFieldProps extends BaseComponentProps {
  /** Field label */
  label: string;
  /** Current array values */
  values: unknown[];
  /** Change handler for entire array */
  onChange: (values: unknown[]) => void;
  /** Render function for each item */
  renderItem: (value: unknown, index: number, onChange: (val: unknown) => void, onRemove: () => void) => ReactNode;
  /** Add new item handler (returns default value) */
  onAdd?: () => unknown;
  /** Maximum number of items */
  maxItems?: number;
  /** Minimum number of items */
  minItems?: number;
  /** Whether reordering is enabled */
  reorderable?: boolean;
  /** Readonly */
  readonly?: boolean;
  /** Error message */
  error?: string;
}

export const ConfigFormArrayField: React.FC<ConfigFormArrayFieldProps> = ({
  label,
  values,
  onChange,
  renderItem,
  onAdd,
  maxItems,
  minItems = 0,
  reorderable = false,
  readonly = false,
  error,
  className = "",
  style,
  ...rest
}) => {
  const canAdd = maxItems === undefined || values.length < maxItems;
  const canRemove = values.length > minItems;

  const handleAdd = useCallback(() => {
    const defaultVal = onAdd ? onAdd() : "";
    onChange([...values, defaultVal]);
  }, [values, onChange, onAdd]);

  const handleChange = useCallback((index: number, val: unknown) => {
    const next = values.map((v, i) => i === index ? val : v);
    onChange(next);
  }, [values, onChange]);

  const handleRemove = useCallback((index: number) => {
    if (!canRemove) return;
    onChange(values.filter((_, i) => i !== index));
  }, [values, onChange, canRemove]);

  const handleMove = useCallback((index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= values.length) return;
    const next = [...values];
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    onChange(next);
  }, [values, onChange]);

  return (
    <div className={`tf-config-form-array-field ${error ? "tf-config-form-array-field--error" : ""} ${className}`} style={style} data-testid="config-form-array-field" {...rest}>
      <div className="tf-config-form-array-field__header">
        <label className="tf-config-form-array-field__label">{label}</label>
        <span className="tf-config-form-array-field__count">{values.length}{maxItems ? ` / ${maxItems}` : ""}</span>
      </div>
      <div className="tf-config-form-array-field__items">
        {values.map((val, i) => (
          <div key={i} className="tf-config-form-array-field__item">
            {reorderable && (
              <div className="tf-config-form-array-field__reorder">
                <button type="button" className="tf-config-form-array-field__move-btn" onClick={() => handleMove(i, -1)} disabled={i === 0 || readonly}>↑</button>
                <button type="button" className="tf-config-form-array-field__move-btn" onClick={() => handleMove(i, 1)} disabled={i === values.length - 1 || readonly}>↓</button>
              </div>
            )}
            <div className="tf-config-form-array-field__item-control">
              {renderItem(val, i, (v) => handleChange(i, v), () => handleRemove(i))}
            </div>
            {canRemove && !readonly && (
              <button type="button" className="tf-config-form-array-field__remove-btn" onClick={() => handleRemove(i)} title="Remove">×</button>
            )}
          </div>
        ))}
      </div>
      {canAdd && !readonly && (
        <button type="button" className="tf-config-form-array-field__add-btn" onClick={handleAdd}>
          + Add {label}
        </button>
      )}
      {error && <span className="tf-config-form-array-field__error">{error}</span>}
    </div>
  );
};

ConfigFormArrayField.displayName = "ConfigFormArrayField";
export default ConfigFormArrayField;
