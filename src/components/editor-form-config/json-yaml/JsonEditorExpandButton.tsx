import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * JsonEditorExpandButton — expand all nodes button.
 *
 * @example
 * <JsonEditorExpandButton onExpandAll={handleExpand} />
 */
export interface JsonEditorExpandButtonProps extends BaseComponentProps {
  /** Expand handler */
  onExpandAll: () => void;
}

export const JsonEditorExpandButton: React.FC<JsonEditorExpandButtonProps> = ({
  onExpandAll,
  className = "",
  style,
  ...rest
}) => (
  <button
    className={`tf-json-editor-expand-btn ${className}`}
    style={style}
    onClick={onExpandAll}
    title="Expand All"
    type="button"
    data-testid="json-editor-expand-button"
    {...rest}
  >
    ++
    <span className="tf-json-editor-expand-btn__label">Expand</span>
  </button>
);

JsonEditorExpandButton.displayName = "JsonEditorExpandButton";
export default JsonEditorExpandButton;
