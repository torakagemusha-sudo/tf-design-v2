import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * PatchEditorRevertButton — revert selected patch hunks.
 *
 * @example
 * <PatchEditorRevertButton onRevert={handleRevert} disabled={false} />
 */
export interface PatchEditorRevertButtonProps extends BaseComponentProps {
  onRevert: () => void | Promise<void>;
  disabled?: boolean;
  reverting?: boolean;
  count?: number;
}

export const PatchEditorRevertButton: React.FC<PatchEditorRevertButtonProps> = ({
  onRevert,
  disabled = false,
  reverting = false,
  count,
  className = "",
  style,
  ...rest
}) => (
  <button
    className={`tf-patch-editor-revert-btn ${reverting ? "tf-patch-editor-revert-btn--reverting" : ""} ${className}`}
    style={style}
    onClick={onRevert}
    disabled={disabled || reverting}
    type="button"
    data-testid="patch-editor-revert-button"
    {...rest}
  >
    {reverting ? (
      <>
        <span className="tf-patch-editor-revert-btn__spinner" />
        Reverting...
      </>
    ) : (
      <>Revert{count !== undefined ? ` (${count})` : ""}</>
    )}
  </button>
);

PatchEditorRevertButton.displayName = "PatchEditorRevertButton";
export default PatchEditorRevertButton;
