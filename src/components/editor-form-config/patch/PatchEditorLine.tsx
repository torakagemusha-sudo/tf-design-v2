import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * PatchEditorLine — single diff line within a patch hunk.
 *
 * @example
 * <PatchEditorLine line={{type:"add", content:"new line", lineNumber:5}} />
 */
export interface PatchEditorLineProps extends BaseComponentProps {
  line: PatchLine;
  viewMode?: "unified" | "split";
  /** Whether line is highlighted */
  highlighted?: boolean;
  /** Click handler */
  onClick?: () => void;
}

export const PatchEditorLine: React.FC<PatchEditorLineProps> = ({
  line,
  viewMode = "unified",
  highlighted = false,
  onClick,
  className = "",
  style,
  ...rest
}) => {
  const prefix = line.type === "add" ? "+" : line.type === "remove" ? "−" : " ";
  return (
    <div
      className={`tf-patch-editor-line tf-patch-editor-line--${line.type} ${highlighted ? "tf-patch-editor-line--highlighted" : ""} tf-patch-editor-line--${viewMode} ${className}`}
      style={style}
      onClick={onClick}
      data-testid={`patch-line-${line.lineNumber}`}
      {...rest}
    >
      <span className="tf-patch-editor-line__prefix">{prefix}</span>
      <span className="tf-patch-editor-line__oldno">{line.type !== "add" ? line.lineNumber : ""}</span>
      <span className="tf-patch-editor-line__newno">{line.type !== "remove" ? (line.newLineNumber ?? "") : ""}</span>
      <span className="tf-patch-editor-line__content">{line.content}</span>
    </div>
  );
};

PatchEditorLine.displayName = "PatchEditorLine";
export default PatchEditorLine;
