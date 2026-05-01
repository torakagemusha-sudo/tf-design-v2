import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * SchemaEditorToolbar — toolbar for the schema editor with zoom, layout, and node actions.
 *
 * @example
 * <SchemaEditorToolbar onAddNode={addNode} onAutoLayout={autoLayout} onExport={exportSchema} />
 */
export interface SchemaEditorToolbarProps extends BaseComponentProps {
  /** Add node handler */
  onAddNode?: (type: SchemaNodeData["type"]) => void;
  /** Auto-layout handler */
  onAutoLayout?: () => void;
  /** Export handler */
  onExport?: (format: "json" | "sql" | "png") => void;
  /** Import handler */
  onImport?: () => void;
  /** Undo handler */
  onUndo?: () => void;
  /** Redo handler */
  onRedo?: () => void;
  /** Can undo */
  canUndo?: boolean;
  /** Can redo */
  canRedo?: boolean;
  /** Search query */
  searchQuery?: string;
  /** Search change */
  onSearchChange?: (q: string) => void;
  /** Extra toolbar items */
  extraItems?: ReactNode;
}

export const SchemaEditorToolbar: React.FC<SchemaEditorToolbarProps> = ({
  onAddNode,
  onAutoLayout,
  onExport,
  onImport,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  searchQuery = "",
  onSearchChange,
  extraItems,
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-schema-editor-toolbar ${className}`} style={style} data-testid="schema-editor-toolbar" {...rest}>
    <div className="tf-schema-editor-toolbar__group">
      <button className="tf-schema-editor-toolbar__btn" onClick={() => onAddNode?.("entity")} title="Add Entity">
        <svg width="14" height="14" viewBox="0 0 14 14"><rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" fill="none" strokeWidth="1.2"/><path d="M7 4v6M4 7h6" stroke="currentColor" strokeWidth="1.2"/></svg>
        Entity
      </button>
      <button className="tf-schema-editor-toolbar__btn" onClick={() => onAddNode?.("attribute")} title="Add Attribute">Attr</button>
      <button className="tf-schema-editor-toolbar__btn" onClick={() => onAddNode?.("relation")} title="Add Relation">Rel</button>
    </div>
    <div className="tf-schema-editor-toolbar__divider" />
    <div className="tf-schema-editor-toolbar__group">
      <button className="tf-schema-editor-toolbar__btn" onClick={onUndo} disabled={!canUndo} title="Undo">↶</button>
      <button className="tf-schema-editor-toolbar__btn" onClick={onRedo} disabled={!canRedo} title="Redo">↷</button>
    </div>
    <div className="tf-schema-editor-toolbar__divider" />
    <div className="tf-schema-editor-toolbar__group">
      <button className="tf-schema-editor-toolbar__btn" onClick={onAutoLayout} title="Auto Layout">⧉ Layout</button>
      <button className="tf-schema-editor-toolbar__btn" onClick={onImport} title="Import">Import</button>
      <button className="tf-schema-editor-toolbar__btn" onClick={() => onExport?.("json")} title="Export">Export</button>
    </div>
    {onSearchChange && (
      <>
        <div className="tf-schema-editor-toolbar__divider" />
        <div className="tf-schema-editor-toolbar__group">
          <input
            className="tf-schema-editor-toolbar__search"
            type="search"
            placeholder="Search nodes..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>
      </>
    )}
    {extraItems && <div className="tf-schema-editor-toolbar__extra">{extraItems}</div>}
  </div>
);

SchemaEditorToolbar.displayName = "SchemaEditorToolbar";
export default SchemaEditorToolbar;
