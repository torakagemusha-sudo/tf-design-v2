import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * CodePaneBreadcrumb — breadcrumb navigation showing file path and symbol context.
 *
 * @example
 * <CodePaneBreadcrumb path="src/components/Button.tsx" language="typescript" symbol="handleClick" />
 */
export interface CodePaneBreadcrumbProps extends BaseComponentProps {
  /** File path segments or full path */
  path: string;
  /** Programming language */
  language?: string;
  /** Current symbol (function/class name) */
  symbol?: string;
  /** Path separator */
  separator?: string;
  /** Click handler for segments */
  onSegmentClick?: (segment: string, index: number) => void;
}

export const CodePaneBreadcrumb: React.FC<CodePaneBreadcrumbProps> = ({
  path,
  language,
  symbol,
  separator = "/",
  onSegmentClick,
  className = "",
  style,
  ...rest
}) => {
  const segments = path.split(separator).filter(Boolean);

  return (
    <nav className={`tf-code-pane-breadcrumb ${className}`} style={style} data-testid="code-pane-breadcrumb" {...rest}>
      {segments.map((seg, i) => (
        <span key={i} className="tf-code-pane-breadcrumb__segment">
          {i > 0 && <span className="tf-code-pane-breadcrumb__sep">{separator}</span>}
          <button
            className="tf-code-pane-breadcrumb__btn"
            onClick={() => onSegmentClick?.(seg, i)}
            title={segments.slice(0, i + 1).join(separator)}
          >
            {seg}
          </button>
        </span>
      ))}
      {symbol && (
        <>
          <span className="tf-code-pane-breadcrumb__sep">›</span>
          <span className="tf-code-pane-breadcrumb__symbol">{symbol}</span>
        </>
      )}
      {language && <span className="tf-code-pane-breadcrumb__lang">[{language}]</span>}
    </nav>
  );
};

CodePaneBreadcrumb.displayName = "CodePaneBreadcrumb";
export default CodePaneBreadcrumb;
