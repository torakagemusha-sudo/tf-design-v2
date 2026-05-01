import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * ConfigImportButton — button for importing configuration from file.
 *
 * @example
 * <ConfigImportButton onImport={handleImport} accept=".json,.yaml" />
 */
export interface ConfigImportButtonProps extends BaseComponentProps {
  onImport: (content: string, filename: string) => void | Promise<void>;
  accept?: string;
  label?: string;
  disabled?: boolean;
  /** Supported formats for display */
  formats?: string[];
}

export const ConfigImportButton: React.FC<ConfigImportButtonProps> = ({
  onImport,
  accept = ".json,.yaml,.yml,.toml",
  label = "Import",
  disabled = false,
  formats = ["JSON", "YAML", "TOML"],
  className = "",
  style,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onImport(String(reader.result), file.name);
    reader.readAsText(file);
    e.target.value = "";
  }, [onImport]);

  return (
    <div className={`tf-config-import-btn ${className}`} style={style} data-testid="config-import-button" {...rest}>
      <input
        ref={inputRef}
        className="tf-config-import-btn__input"
        type="file"
        accept={accept}
        onChange={handleFile}
        disabled={disabled}
      />
      <button
        className="tf-config-import-btn__trigger"
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={disabled}
      >
        <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 2v8M4 5l3-3 3 3M2 10v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="currentColor" fill="none" strokeWidth="1.2"/></svg>
        {label}
      </button>
      {formats.length > 0 && <span className="tf-config-import-btn__formats">{formats.join(", ")}</span>}
    </div>
  );
};

ConfigImportButton.displayName = "ConfigImportButton";
export default ConfigImportButton;
