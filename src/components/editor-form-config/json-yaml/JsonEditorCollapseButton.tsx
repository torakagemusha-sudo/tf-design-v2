import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * JsonEditorCollapseButton — collapse all nodes button.
 *
 * @example
 * <JsonEditorCollapseButton onCollapseAll={handleCollapse} />
 */
export interface JsonEditorCollapseButtonProps extends BaseComponentProps {
  /** Collapse handler */
  onCollapseAll: () => void;
}

export const JsonEditorCollapseButton: React.FC<JsonEditorCollapseButtonProps> = ({
  onCollapseAll,
  className = "",
  style,
  ...rest
}) => (
  <button
    className={`tf-json-editor-collapse-btn ${className}`}
    style={style}
    onClick={onCollapseAll}
    title="Collapse All"
    type="button"
    data-testid="json-editor-collapse-button"
    {...rest}
  >
    −−
    <span className="tf-json-editor-collapse-btn__label">Collapse</span>
  </button>
);

JsonEditorCollapseButton.displayName = "JsonEditorCollapseButton";
export default JsonEditorCollapseButton;
