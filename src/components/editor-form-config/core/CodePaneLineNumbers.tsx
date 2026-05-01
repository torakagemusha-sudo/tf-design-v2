import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * CodePaneLineNumbers — line number gutter for the code pane.
 *
 * @example
 * <CodePaneLineNumbers lines={50} currentLine={10} />
 */
export interface CodePaneLineNumbersProps extends BaseComponentProps {
  /** Total number of lines */
  lines: number;
  /** Currently focused line */
  currentLine?: number;
  /** Selected line range */
  selectedRange?: { start: number; end: number };
  /** Whether lines are relative (diff mode) */
  relative?: boolean;
  /** Start offset for relative numbering */
  startOffset?: number;
}

export const CodePaneLineNumbers: React.FC<CodePaneLineNumbersProps> = ({
  lines,
  currentLine = 0,
  selectedRange,
  relative = false,
  startOffset = 0,
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-code-pane-line-numbers ${className}`} style={style} data-testid="code-pane-line-numbers" {...rest}>
    {Array.from({ length: lines }, (_, i) => {
      const lineNum = relative ? i + 1 : i + 1 + startOffset;
      const isCurrent = i + 1 === currentLine;
      const isSelected = selectedRange ? i + 1 >= selectedRange.start && i + 1 <= selectedRange.end : false;
      return (
        <div
          key={i}
          className={`tf-code-pane-line-numbers__line ${isCurrent ? "tf-code-pane-line-numbers__line--current" : ""} ${isSelected ? "tf-code-pane-line-numbers__line--selected" : ""}`}
        >
          {lineNum}
        </div>
      );
    })}
  </div>
);

CodePaneLineNumbers.displayName = "CodePaneLineNumbers";
export default CodePaneLineNumbers;
