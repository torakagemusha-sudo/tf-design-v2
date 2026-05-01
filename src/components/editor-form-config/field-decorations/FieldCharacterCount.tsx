import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FieldCharacterCount — displays current/max character count.
 *
 * @example
 * <FieldCharacterCount current={45} max={100} />
 */
export interface FieldCharacterCountProps extends BaseComponentProps {
  current: number;
  max?: number;
  /** Warn threshold (percentage) */
  warnAt?: number;
}

export const FieldCharacterCount: React.FC<FieldCharacterCountProps> = ({
  current,
  max,
  warnAt = 0.8,
  className = "",
  style,
  ...rest
}) => {
  const ratio = max ? current / max : 0;
  const state = max ? (ratio > 1 ? "over" : ratio >= warnAt ? "warn" : "ok") : "ok";

  return (
    <span className={`tf-field-character-count tf-field-character-count--${state} ${className}`} style={style} data-testid="field-character-count" {...rest}>
      {current}{max ? ` / ${max}` : ""}
    </span>
  );
};

FieldCharacterCount.displayName = "FieldCharacterCount";
export default FieldCharacterCount;
