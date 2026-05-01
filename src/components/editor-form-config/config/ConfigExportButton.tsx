import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * ConfigExportButton — button for exporting configuration to file.
 *
 * @example
 * <ConfigExportButton config={config} filename="settings.json" format="json" />
 */
export interface ConfigExportButtonProps extends BaseComponentProps {
  config: Record<string, unknown>;
  filename?: string;
  format?: "json" | "yaml" | "toml";
  label?: string;
  disabled?: boolean;
  /** Pre-export transform */
  transform?: (config: Record<string, unknown>) => Record<string, unknown>;
}

export const ConfigExportButton: React.FC<ConfigExportButtonProps> = ({
  config,
  filename = "config.json",
  format = "json",
  label = "Export",
  disabled = false,
  transform,
  className = "",
  style,
  ...rest
}) => {
  const handleExport = useCallback(() => {
    const data = transform ? transform(config) : config;
    let content: string;
    let mime: string;
    switch (format) {
      case "yaml": content = JSON.stringify(data, null, 2); mime = "application/x-yaml"; break;
      case "toml": content = JSON.stringify(data, null, 2); mime = "application/toml"; break;
      default: content = JSON.stringify(data, null, 2); mime = "application/json"; break;
    }
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [config, filename, format, transform]);

  return (
    <button
      className={`tf-config-export-btn ${className}`}
      style={style}
      type="button"
      onClick={handleExport}
      disabled={disabled}
      data-testid="config-export-button"
      {...rest}
    >
      <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 2v8M4 7l3 3 3-3M2 11v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="currentColor" fill="none" strokeWidth="1.2"/></svg>
      {label} ({format.toUpperCase()})
    </button>
  );
};

ConfigExportButton.displayName = "ConfigExportButton";
export default ConfigExportButton;
