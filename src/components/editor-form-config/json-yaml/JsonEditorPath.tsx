import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * JsonEditorPath — path navigator showing current JSON path position.
 *
 * @example
 * <JsonEditorPath path="users[0].name" onSegmentClick={navigateTo} />
 */
export interface JsonEditorPathProps extends BaseComponentProps {
  /** Current JSON path */
  path: string;
  /** Click handler for path segments */
  onSegmentClick?: (segment: string) => void;
  /** Root label */
  rootLabel?: string;
}

export const JsonEditorPath: React.FC<JsonEditorPathProps> = ({
  path,
  onSegmentClick,
  rootLabel = "root",
  className = "",
  style,
  ...rest
}) => {
  const segments = useMemo(() => {
    if (!path || path === rootLabel) return [rootLabel];
    // Split on . but preserve [n] as part of segment
    return [rootLabel, ...path.split(".").filter(Boolean)];
  }, [path, rootLabel]);

  return (
    <div className={`tf-json-editor-path ${className}`} style={style} data-testid="json-editor-path" {...rest}>
      {segments.map((seg, i) => (
        <span key={i} className="tf-json-editor-path__segment">
          {i > 0 && <span className="tf-json-editor-path__sep">›</span>}
          <button
            className="tf-json-editor-path__btn"
            onClick={() => onSegmentClick?.(segments.slice(1, i + 1).join("."))}
          >
            {seg}
          </button>
        </span>
      ))}
    </div>
  );
};

JsonEditorPath.displayName = "JsonEditorPath";
export default JsonEditorPath;
