import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FieldRequiredIndicator — required field marker (red asterisk).
 *
 * @example
 * <FieldRequiredIndicator />
 */
export interface FieldRequiredIndicatorProps extends BaseComponentProps {
  /** Custom indicator character */
  indicator?: string;
  /** Title/aria-label */
  title?: string;
}

export const FieldRequiredIndicator: React.FC<FieldRequiredIndicatorProps> = ({
  indicator = "*",
  title = "Required field",
  className = "",
  style,
  ...rest
}) => (
  <span
    className={`tf-field-required-indicator ${className}`}
    style={style}
    title={title}
    aria-label={title}
    data-testid="field-required-indicator"
    {...rest}
  >
    {indicator}
  </span>
);

FieldRequiredIndicator.displayName = "FieldRequiredIndicator";
export default FieldRequiredIndicator;
