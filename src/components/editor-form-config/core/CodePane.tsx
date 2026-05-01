import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * CodePane — code editing pane with syntax highlighting, line numbers, and minimap.
 * IDE-like code editing surface for the Torafirma editor.
 *
 * @example
 * <CodePane document={doc} onChange={handleChange} language="typescript" />
 */
export interface CodePaneProps extends BaseComponentProps {
  /** Code document to edit */
  document: CodeDocument;
  /** Content change handler */
  onChange: (content: string) => void;
  /** Programming language for syntax highlighting */
  language?: string;
  /** Whether editor is readonly */
  readonly?: boolean;
  /** Show/hide line numbers */
  showLineNumbers?: boolean;
  /** Show/hide minimap */
  showMinimap?: boolean;
  /** Show/hide breadcrumbs */
  showBreadcrumbs?: boolean;
  /** Show/hide status bar */
  showStatusBar?: boolean;
  /** Font size in pixels */
  fontSize?: number;
  /** Tab size */
  tabSize?: number;
  /** Whether to use spaces for tabs */
  useSpaces?: boolean;
  /** Word wrap */
  wordWrap?: boolean;
  /** Current cursor position */
  cursorPosition?: { line: number; column: number };
  /** Selection range */
  selection?: { start: number; end: number };
  /** Code search query */
  searchQuery?: string;
  /** Extra toolbar items */
  toolbarExtra?: ReactNode;
}

export const CodePane: React.FC<CodePaneProps> = ({
  document,
  onChange,
  language = "typescript",
  readonly = false,
  showLineNumbers = true,
  showMinimap = true,
  showBreadcrumbs = true,
  showStatusBar = true,
  fontSize = 13,
  tabSize = 2,
  useSpaces = true,
  wordWrap = false,
  cursorPosition = { line: 1, column: 1 },
  selection,
  searchQuery = "",
  toolbarExtra,
  className = "",
  style,
  ...rest
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState(document.content);
  const [search, setSearch] = useState(searchQuery);
  const lines = useMemo(() => content.split("\n"), [content]);
  const charCount = content.length;
  const lineCount = lines.length;

  useEffect(() => { setContent(document.content); }, [document.content]);

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    onChange(e.target.value);
  }, [onChange]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = textareaRef.current;
      if (!ta) return;
      const indent = useSpaces ? " ".repeat(tabSize) : "\t";
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newValue = content.substring(0, start) + indent + content.substring(end);
      setContent(newValue);
      onChange(newValue);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + indent.length;
      });
    }
  }, [content, onChange, tabSize, useSpaces]);

  return (
    <div className={`tf-code-pane ${readonly ? "tf-code-pane--readonly" : ""} ${className}`} style={style} data-testid="code-pane" {...rest}>
      {showBreadcrumbs && (
        <CodePaneBreadcrumb path={document.filename} language={language} />
      )}
      <CodePaneToolbar
        language={language}
        modified={document.modified}
        readonly={readonly}
        searchQuery={search}
        onSearchChange={setSearch}
        extraItems={toolbarExtra}
      />
      <div className="tf-code-pane__editor">
        {showLineNumbers && (
          <CodePaneLineNumbers lines={lineCount} currentLine={cursorPosition.line} />
        )}
        <div className="tf-code-pane__textarea-wrap">
          <textarea
            ref={textareaRef}
            className="tf-code-pane__textarea"
            value={content}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            readOnly={readonly}
            spellCheck={false}
            style={{ fontSize: `${fontSize}px`, whiteSpace: wordWrap ? "pre-wrap" : "pre" }}
          />
          {search && <CodePaneSearchOverlay query={search} content={content} />}
        </div>
        {showMinimap && (
          <CodePaneMinimap content={content} viewportStart={0} viewportEnd={Math.min(25, lineCount)} />
        )}
      </div>
      {showStatusBar && (
        <CodePaneStatusBar
          language={language}
          line={cursorPosition.line}
          column={cursorPosition.column}
          lineCount={lineCount}
          charCount={charCount}
          encoding="UTF-8"
          modified={document.modified}
        />
      )}
    </div>
  );
};

/** Inline search overlay */
const CodePaneSearchOverlay: React.FC<{ query: string; content: string }> = ({ query, content }) => {
  const matches = useMemo(() => {
    if (!query) return 0;
    const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    return (content.match(regex) || []).length;
  }, [query, content]);

  return (
    <div className="tf-code-pane__search-overlay">
      <span className="tf-code-pane__search-count">{matches} match{matches !== 1 ? "es" : ""}</span>
    </div>
  );
};

CodePane.displayName = "CodePane";
export default CodePane;
