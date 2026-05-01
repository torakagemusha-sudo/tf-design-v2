import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * PatchEditorApplyButton — apply selected patch hunks.
 *
 * @example
 * <PatchEditorApplyButton onApply={handleApply} count={3} disabled={false} />
 */
export interface PatchEditorApplyButtonProps extends BaseComponentProps {
  onApply: () => void | Promise<void>;
  disabled?: boolean;
  applying?: boolean;
  count?: number;
}

export const PatchEditorApplyButton: React.FC<PatchEditorApplyButtonProps> = ({
  onApply,
  disabled = false,
  applying = false,
  count,
  className = "",
  style,
  ...rest
}) => (
  <button
    className={`tf-patch-editor-apply-btn ${applying ? "tf-patch-editor-apply-btn--applying" : ""} ${className}`}
    style={style}
    onClick={onApply}
    disabled={disabled || applying}
    type="button"
    data-testid="patch-editor-apply-button"
    {...rest}
  >
    {applying ? (
      <>
        <span className="tf-patch-editor-apply-btn__spinner" />
        Applying...
      </>
    ) : (
      <>Apply{count !== undefined ? ` (${count})` : ""}</>
    )}
  </button>
);

PatchEditorApplyButton.displayName = "PatchEditorApplyButton";
export default PatchEditorApplyButton;
