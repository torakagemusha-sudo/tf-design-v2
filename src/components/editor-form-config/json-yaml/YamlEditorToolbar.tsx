import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * YamlEditorToolbar — toolbar for YAML editor with format and validate actions.
 *
 * @example
 * <YamlEditorToolbar onFormat={format} onValidate={validate} isValid={true} />
 */
export interface YamlEditorToolbarProps extends BaseComponentProps {
  /** Format handler */
  onFormat?: () => void;
  /** Validate handler */
  onValidate?: () => void;
  /** Import handler */
  onImport?: () => void;
  /** Export handler */
  onExport?: () => void;
  /** Convert to JSON handler */
  onConvertToJson?: () => void;
  /** Current validity */
  isValid: boolean;
  /** Validating state */
  validating?: boolean;
  /** Extra items */
  extraItems?: ReactNode;
}

export const YamlEditorToolbar: React.FC<YamlEditorToolbarProps> = ({
  onFormat,
  onValidate,
  onImport,
  onExport,
  onConvertToJson,
  isValid,
  validating = false,
  extraItems,
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-yaml-editor-toolbar ${className}`} style={style} data-testid="yaml-editor-toolbar" {...rest}>
    <div className="tf-yaml-editor-toolbar__lang">
      <span className="tf-yaml-editor-toolbar__badge">YAML</span>
    </div>
    <div className="tf-yaml-editor-toolbar__actions">
      {onFormat && <button className="tf-yaml-editor-toolbar__btn" onClick={onFormat} title="Format">Format</button>}
      {onValidate && (
        <button className={`tf-yaml-editor-toolbar__btn tf-yaml-editor-toolbar__btn--${isValid ? "valid" : "validate"}`} onClick={onValidate} disabled={validating}>
          {validating ? "Checking..." : isValid ? "✓ Valid" : "Validate"}
        </button>
      )}
      {onConvertToJson && <button className="tf-yaml-editor-toolbar__btn" onClick={onConvertToJson}>→ JSON</button>}
      {onImport && <button className="tf-yaml-editor-toolbar__btn" onClick={onImport}>Import</button>}
      {onExport && <button className="tf-yaml-editor-toolbar__btn" onClick={onExport}>Export</button>}
    </div>
    {extraItems && <div className="tf-yaml-editor-toolbar__extra">{extraItems}</div>}
  </div>
);

YamlEditorToolbar.displayName = "YamlEditorToolbar";
export default YamlEditorToolbar;
