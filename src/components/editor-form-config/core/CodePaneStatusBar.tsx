import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * CodePaneStatusBar — status bar showing cursor, encoding, language, and doc state.
 *
 * @example
 * <CodePaneStatusBar language="typescript" line={12} column={34} lineCount={200} charCount={5000} modified />
 */
export interface CodePaneStatusBarProps extends BaseComponentProps {
  /** Programming language */
  language?: string;
  /** Current line */
  line: number;
  /** Current column */
  column: number;
  /** Total lines */
  lineCount: number;
  /** Total characters */
  charCount: number;
  /** File encoding */
  encoding?: string;
  /** Line ending style */
  lineEnding?: "LF" | "CRLF";
  /** Whether document is modified */
  modified?: boolean;
  /** Indentation type */
  indentType?: string;
  /** Extra status items */
  extraItems?: ReactNode;
}

export const CodePaneStatusBar: React.FC<CodePaneStatusBarProps> = ({
  language = "text",
  line,
  column,
  lineCount,
  charCount,
  encoding = "UTF-8",
  lineEnding = "LF",
  modified = false,
  indentType = "Spaces: 2",
  extraItems,
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-code-pane-status-bar ${modified ? "tf-code-pane-status-bar--modified" : ""} ${className}`} style={style} data-testid="code-pane-status-bar" {...rest}>
    <div className="tf-code-pane-status-bar__section">
      {modified && <span className="tf-code-pane-status-bar__modified" title="Unsaved changes">●</span>}
      <span className="tf-code-pane-status-bar__cursor">Ln {line}, Col {column}</span>
    </div>
    <div className="tf-code-pane-status-bar__section">
      <span className="tf-code-pane-status-bar__lines">{lineCount} lines</span>
      <span className="tf-code-pane-status-bar__chars">{charCount} chars</span>
    </div>
    <div className="tf-code-pane-status-bar__section">
      <span className="tf-code-pane-status-bar__encoding">{encoding}</span>
      <span className="tf-code-pane-status-bar__eol">{lineEnding}</span>
      <span className="tf-code-pane-status-bar__indent">{indentType}</span>
      <span className="tf-code-pane-status-bar__lang">{language}</span>
    </div>
    {extraItems && <div className="tf-code-pane-status-bar__extra">{extraItems}</div>}
  </div>
);

CodePaneStatusBar.displayName = "CodePaneStatusBar";
export default CodePaneStatusBar;
