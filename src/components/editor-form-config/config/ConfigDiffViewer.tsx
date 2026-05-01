import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * ConfigDiffViewer — compares two configuration objects side-by-side.
 *
 * @example
 * <ConfigDiffViewer left={oldConfig} right={newConfig} leftLabel="v1" rightLabel="v2" />
 */
export interface ConfigDiffViewerProps extends BaseComponentProps {
  /** Left/original config */
  left: Record<string, unknown>;
  /** Right/new config */
  right: Record<string, unknown>;
  leftLabel?: string;
  rightLabel?: string;
  /** Show only differences */
  showOnlyDiffs?: boolean;
  /** Expand nested objects */
  expanded?: boolean;
}

export const ConfigDiffViewer: React.FC<ConfigDiffViewerProps> = ({
  left,
  right,
  leftLabel = "Left",
  rightLabel = "Right",
  showOnlyDiffs = false,
  expanded = true,
  className = "",
  style,
  ...rest
}) => {
  const diff = useMemo(() => {
    const allKeys = new Set([...Object.keys(left), ...Object.keys(right)]);
    return Array.from(allKeys).map(key => {
      const l = left[key];
      const r = right[key];
      let type: "same" | "added" | "removed" | "modified" = "same";
      if (!(key in left)) type = "added";
      else if (!(key in right)) type = "removed";
      else if (JSON.stringify(l) !== JSON.stringify(r)) type = "modified";
      return { key, left: l, right: r, type };
    }).filter(d => !showOnlyDiffs || d.type !== "same");
  }, [left, right, showOnlyDiffs]);

  return (
    <div className={`tf-config-diff-viewer ${className}`} style={style} data-testid="config-diff-viewer" {...rest}>
      <div className="tf-config-diff-viewer__header">
        <span className="tf-config-diff-viewer__col tf-config-diff-viewer__col--left">{leftLabel}</span>
        <span className="tf-config-diff-viewer__col tf-config-diff-viewer__col--right">{rightLabel}</span>
      </div>
      <div className="tf-config-diff-viewer__body">
        {diff.map(d => (
          <div key={d.key} className={`tf-config-diff-viewer__row tf-config-diff-viewer__row--${d.type}`}>
            <span className="tf-config-diff-viewer__key">{d.key}</span>
            <span className="tf-config-diff-viewer__left">{d.left !== undefined ? JSON.stringify(d.left) : <em>—</em>}</span>
            <span className="tf-config-diff-viewer__right">{d.right !== undefined ? JSON.stringify(d.right) : <em>—</em>}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

ConfigDiffViewer.displayName = "ConfigDiffViewer";
export default ConfigDiffViewer;
