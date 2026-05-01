import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldFileDropzone — drag-and-drop file upload area.
 *
 * @example
 * <FormFieldFileDropzone name="upload" files={files} onChange={setFiles} accept="image/*" />
 */
export interface FormFieldFileDropzoneProps extends BaseComponentProps {
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

export const FormFieldFileDropzone: React.FC<FormFieldFileDropzoneProps> = ({
  name,
  label,
  files,
  onChange,
  accept,
  multiple = true,
  maxSize,
  maxFiles,
  error,
  disabled = false,
  className = "",
  style,
  ...rest
}) => {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files).map(f => ({
      id: `dz_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      name: f.name, size: f.size, type: f.type, progress: 0,
    }));
    const combined = multiple ? [...files, ...dropped].slice(0, maxFiles) : dropped;
    onChange(name, combined);
  }, [files, onChange, name, multiple, maxFiles]);

  return (
    <div
      className={`tf-form-field-file-dropzone ${dragOver ? "tf-form-field-file-dropzone--dragover" : ""} ${files.length > 0 ? "tf-form-field-file-dropzone--has-files" : ""} ${error ? "tf-form-field--error" : ""} ${className}`}
      style={style}
      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      data-testid={`form-field-file-dropzone-${name}`}
      {...rest}
    >
      <input
        ref={inputRef}
        className="tf-form-field-file-dropzone__input"
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        onChange={e => {
          const selected = Array.from(e.target.files || []).map(f => ({
            id: `dz_${Date.now()}_${Math.random().toString(36).slice(2)}`,
            name: f.name, size: f.size, type: f.type, progress: 0,
          }));
          onChange(name, multiple ? [...files, ...selected].slice(0, maxFiles) : selected);
        }}
        disabled={disabled}
      />
      <div className="tf-form-field-file-dropzone__content">
        <svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 4v16M10 10l6-6 6 6M6 18v6a2 2 0 002 2h16a2 2 0 002-2v-6" stroke="currentColor" fill="none" strokeWidth="1.5"/></svg>
        {label && <span className="tf-form-field-file-dropzone__label">{label}</span>}
        <span className="tf-form-field-file-dropzone__hint">Drag & drop files here or <button type="button" className="tf-form-field-file-dropzone__browse" onClick={() => inputRef.current?.click()}>browse</button></span>
        {maxSize && <span className="tf-form-field-file-dropzone__max">Max {maxSize / 1024 / 1024}MB per file</span>}
      </div>
      {files.length > 0 && (
        <div className="tf-form-field-file-dropzone__files">
          {files.map(f => (
            <div key={f.id} className="tf-form-field-file-dropzone__file">
              <span>{f.name}</span>
              <button type="button" onClick={() => onChange(name, files.filter(x => x.id !== f.id))}>×</button>
            </div>
          ))}
        </div>
      )}
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldFileDropzone.displayName = "FormFieldFileDropzone";
export default FormFieldFileDropzone;
