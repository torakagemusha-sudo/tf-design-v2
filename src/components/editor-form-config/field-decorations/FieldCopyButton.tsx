import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FieldCopyButton — copies a field value to clipboard.
 *
 * @example
 * <FieldCopyButton value="api-key-123" label="Copy API Key" />
 */
export interface FieldCopyButtonProps extends BaseComponentProps {
  value: string;
  label?: string;
  /** Duration to show copied state in ms */
  copiedDuration?: number;
}

export const FieldCopyButton: React.FC<FieldCopyButtonProps> = ({
  value,
  label = "Copy",
  copiedDuration = 2000,
  className = "",
  style,
  ...rest
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), copiedDuration);
  }, [value, copiedDuration]);

  return (
    <button
      className={`tf-field-copy-btn ${copied ? "tf-field-copy-btn--copied" : ""} ${className}`}
      style={style}
      type="button"
      onClick={handleCopy}
      title={copied ? "Copied!" : "Copy to clipboard"}
      data-testid="field-copy-button"
      {...rest}
    >
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
          Copied
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12"><rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" fill="none" strokeWidth="1.2"/><rect x="5" y="1" width="6" height="6" rx="1" stroke="currentColor" fill="none" strokeWidth="1.2" opacity="0.5"/></svg>
          {label}
        </>
      )}
    </button>
  );
};

FieldCopyButton.displayName = "FieldCopyButton";
export default FieldCopyButton;
