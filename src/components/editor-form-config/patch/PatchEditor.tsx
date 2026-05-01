import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * PatchEditor — diff/patch editor for reviewing and applying code changes.
 * Provides a unified interface for viewing and managing patch hunks.
 *
 * @example
 * <PatchEditor hunks={hunks} filename="config.ts" onApply={handleApply} onRevert={handleRevert} />
 */
export interface PatchEditorProps extends BaseComponentProps {
  /** Patch hunks to display */
  hunks: PatchHunk[];
  /** Filename being patched */
  filename?: string;
  /** Old file label */
  oldLabel?: string;
  /** New file label */
  newLabel?: string;
  /** Apply handler */
  onApply?: (hunkIds: string[]) => void | Promise<void>;
  /** Revert handler */
  onRevert?: (hunkIds: string[]) => void | Promise<void>;
  /** Review handler */
  onReview?: (hunkId: string, accepted: boolean) => void;
  /** Whether patch is loading */
  loading?: boolean;
  /** Readonly mode */
  readonly?: boolean;
  /** View mode */
  viewMode?: "unified" | "split";
  /** Context lines around changes */
  contextLines?: number;
}

export const PatchEditor: React.FC<PatchEditorProps> = ({
  hunks,
  filename = "file",
  oldLabel = "Original",
  newLabel = "Modified",
  onApply,
  onRevert,
  onReview,
  loading = false,
  readonly = false,
  viewMode = "unified",
  contextLines = 3,
  className = "",
  style,
  ...rest
}) => {
  const [selectedHunks, setSelectedHunks] = useState<Set<string>>(new Set());
  const [reviewedHunks, setReviewedHunks] = useState<Set<string>>(new Set());

  const toggleHunk = useCallback((id: string) => {
    setSelectedHunks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedHunks(new Set(hunks.map(h => h.id)));
  }, [hunks]);

  const selectNone = useCallback(() => {
    setSelectedHunks(new Set());
  }, []);

  const handleReview = useCallback((hunkId: string, accepted: boolean) => {
    setReviewedHunks(prev => {
      const next = new Set(prev);
      if (accepted) next.add(hunkId); else next.delete(hunkId);
      return next;
    });
    onReview?.(hunkId, accepted);
  }, [onReview]);

  const stats = useMemo(() => {
    let added = 0, removed = 0;
    hunks.forEach(h => h.lines.forEach(l => {
      if (l.type === "add") added++;
      if (l.type === "remove") removed++;
    }));
    return { added, removed, net: added - removed };
  }, [hunks]);

  if (loading) {
    return (
      <div className={`tf-patch-editor tf-patch-editor--loading ${className}`} style={style} data-testid="patch-editor" {...rest}>
        <div className="tf-patch-editor__skeleton"><div className="tf-skeleton tf-skeleton--line" /></div>
      </div>
    );
  }

  return (
    <div className={`tf-patch-editor tf-patch-editor--${viewMode} ${className}`} style={style} data-testid="patch-editor" {...rest}>
      <PatchEditorToolbar
        filename={filename}
        oldLabel={oldLabel}
        newLabel={newLabel}
        added={stats.added}
        removed={stats.removed}
        selectedCount={selectedHunks.size}
        totalCount={hunks.length}
        reviewedCount={reviewedHunks.size}
        onSelectAll={selectAll}
        onSelectNone={selectNone}
      />
      <PatchEditorReviewPanel
        hunks={hunks}
        reviewedHunks={reviewedHunks}
        selectedHunks={selectedHunks}
      />
      <div className="tf-patch-editor__hunks">
        {hunks.map(hunk => (
          <PatchEditorHunk
            key={hunk.id}
            hunk={hunk}
            selected={selectedHunks.has(hunk.id)}
            reviewed={reviewedHunks.has(hunk.id)}
            onToggleSelect={() => toggleHunk(hunk.id)}
            onReview={(accepted) => handleReview(hunk.id, accepted)}
            viewMode={viewMode}
            readonly={readonly}
          />
        ))}
      </div>
      <div className="tf-patch-editor__actions">
        <PatchEditorApplyButton
          onApply={() => onApply?.(Array.from(selectedHunks))}
          disabled={selectedHunks.size === 0}
          count={selectedHunks.size}
        />
        <PatchEditorRevertButton
          onRevert={() => onRevert?.(Array.from(selectedHunks))}
          disabled={selectedHunks.size === 0}
        />
      </div>
    </div>
  );
};

PatchEditor.displayName = "PatchEditor";
export default PatchEditor;
