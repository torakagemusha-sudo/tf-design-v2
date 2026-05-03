import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { FormField } from "./FormField";

/**
 * FormFieldImage — image upload with preview, crop hints, and sizing info.
 *
 * @example
 * <FormFieldImage name="avatar" label="Avatar" src={imageUrl} onChange={handleChange} />
 */
export interface FormFieldImageProps extends BaseComponentProps {
  name: string;
  label?: string;
  src?: string;
  onChange: (name: string, file: File | null) => void;
  accept?: string;
  maxWidth?: number;
  maxHeight?: number;
  maxSize?: number;
  error?: string;
  disabled?: boolean;
}

export const FormFieldImage: React.FC<FormFieldImageProps> = ({
  name,
  label,
  src,
  onChange,
  accept = "image/*",
  maxWidth,
  maxHeight,
  maxSize,
  error,
  disabled = false,
  className = "",
  style,
  ...rest
}) => {
  const [preview, setPreview] = useState<string | undefined>(src);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setPreview(src); }, [src]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
    onChange(name, file);
  }, [name, onChange]);

  return (
    <div className={`tf-form-field-image ${preview ? "tf-form-field-image--has-image" : ""} ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-image-${name}`} {...rest}>
      {label && <label className="tf-form-field__label">{label}</label>}
      <div className="tf-form-field-image__area" onClick={() => inputRef.current?.click()}>
        {preview ? (
          <img src={preview} alt={label || name} className="tf-form-field-image__preview" />
        ) : (
          <div className="tf-form-field-image__placeholder">
            <svg width="32" height="32" viewBox="0 0 32 32"><rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" fill="none" strokeWidth="1.5"/><circle cx="12" cy="14" r="2" stroke="currentColor" fill="none" strokeWidth="1.2"/><path d="M4 22l6-6 6 5 4-4 8 7" stroke="currentColor" fill="none" strokeWidth="1.2"/></svg>
            <span>Click to upload image</span>
          </div>
        )}
        <input
          ref={inputRef}
          className="tf-form-field-image__input"
          type="file"
          name={name}
          accept={accept}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
      {(maxWidth || maxHeight || maxSize) && (
        <div className="tf-form-field-image__constraints">
          {maxWidth && maxHeight && <span>{maxWidth}×{maxHeight}px</span>}
          {maxSize && <span>Max {maxSize / 1024}KB</span>}
        </div>
      )}
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldImage.displayName = "FormFieldImage";
export default FormFieldImage;
