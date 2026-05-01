import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldFile — file upload field with progress and status.
 *
 * @example
 * <FormFieldFile name="resume" label="Resume" files={files} onChange={setFiles} accept=".pdf" />
 */
export interface FormFieldFileProps extends BaseComponentProps {
  name: string;
  label?: string;
  files: UploadedFile[];
  onChange: (name: string, files: UploadedFile[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  error?: string;
  disabled?: boolean;
}

export const FormFieldFile: React.FC<FormFieldFileProps> = ({
  name,
  label,
  files,
  onChange,
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  error,
  disabled = false,
  className = "",
  style,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles: UploadedFile[] = Array.from(fileList).map(f => ({
      id: `file_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      name: f.name,
      size: f.size,
      type: f.type,
      progress: 0,
    }));
    const combined = multiple ? [...files, ...newFiles].slice(0, maxFiles) : newFiles;
    onChange(name, combined);
  }, [files, onChange, name, multiple, maxFiles]);

  const removeFile = useCallback((id: string) => {
    onChange(name, files.filter(f => f.id !== id));
  }, [files, onChange, name]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={`tf-form-field-file ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-file-${name}`} {...rest}>
      {label && <label className="tf-form-field__label">{label}</label>}
      <input
        ref={inputRef}
        className="tf-form-field-file__input"
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        onChange={e => handleFiles(e.target.files)}
        disabled={disabled || (maxFiles !== undefined && files.length >= maxFiles)}
      />
      <button type="button" className="tf-form-field-file__trigger" onClick={() => inputRef.current?.click()} disabled={disabled}>
        <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 2v8M5 5l3-3 3 3M3 10v2a2 2 0 002 2h6a2 2 0 002-2v-2" stroke="currentColor" fill="none" strokeWidth="1.2"/></svg>
        Choose File{multiple ? "s" : ""}
      </button>
      {maxSize && <span className="tf-form-field-file__hint">Max size: {formatSize(maxSize)}</span>}
      {files.length > 0 && (
        <ul className="tf-form-field-file__list">
          {files.map(f => (
            <li key={f.id} className={`tf-form-field-file__item ${f.error ? "tf-form-field-file__item--error" : ""}`}>
              <span className="tf-form-field-file__name">{f.name}</span>
              <span className="tf-form-field-file__size">{formatSize(f.size)}</span>
              {f.progress > 0 && f.progress < 100 && (
                <div className="tf-form-field-file__progress"><div className="tf-form-field-file__progress-bar" style={{ width: `${f.progress}%` }} /></div>
              )}
              <button type="button" className="tf-form-field-file__remove" onClick={() => removeFile(f.id)}>×</button>
            </li>
          ))}
        </ul>
      )}
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldFile.displayName = "FormFieldFile";
export default FormFieldFile;
