import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * CodePaneMinimap — code minimap providing an overview of the entire document.
 *
 * @example
 * <CodePaneMinimap content={code} viewportStart={0} viewportEnd={30} onViewportScroll={handleScroll} />
 */
export interface CodePaneMinimapProps extends BaseComponentProps {
  /** Full document content */
  content: string;
  /** First visible line in viewport */
  viewportStart: number;
  /** Last visible line in viewport */
  viewportEnd: number;
  /** Total lines */
  totalLines?: number;
  /** Viewport scroll handler */
  onViewportScroll?: (line: number) => void;
}

export const CodePaneMinimap: React.FC<CodePaneMinimapProps> = ({
  content,
  viewportStart,
  viewportEnd,
  totalLines,
  onViewportScroll,
  className = "",
  style,
  ...rest
}) => {
  const lines = useMemo(() => content.split("\n"), [content]);
  const maxLines = totalLines || lines.length || 1;
  const startPct = (viewportStart / maxLines) * 100;
  const endPct = (viewportEnd / maxLines) * 100;

  return (
    <div className={`tf-code-pane-minimap ${className}`} style={style} data-testid="code-pane-minimap" {...rest}>
      <div className="tf-code-pane-minimap__content">
        {lines.slice(0, 100).map((line, i) => (
          <div key={i} className="tf-code-pane-minimap__line">{line.slice(0, 80)}</div>
        ))}
      </div>
      <div
        className="tf-code-pane-minimap__viewport"
        style={{ top: `${Math.min(startPct, 95)}%`, height: `${Math.max(endPct - startPct, 3)}%` }}
      />
    </div>
  );
};

CodePaneMinimap.displayName = "CodePaneMinimap";
export default CodePaneMinimap;
