import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * ConfigFormActionBar — action bar with submit, reset, and extra actions for config forms.
 *
 * @example
 * <ConfigFormActionBar onSubmit={handleSubmit} onReset={handleReset} dirty={true} submitting={false} />
 */
export interface ConfigFormActionBarProps extends BaseComponentProps {
  /** Submit handler */
  onSubmit?: (e?: React.FormEvent) => void;
  /** Reset handler */
  onReset?: () => void;
  /** Cancel handler */
  onCancel?: () => void;
  /** Whether form has unsaved changes */
  dirty?: boolean;
  /** Whether form is currently submitting */
  submitting?: boolean;
  /** Whether submit is enabled */
  canSubmit?: boolean;
  /** Extra action buttons */
  extraActions?: ReactNode;
  /** Variant */
  variant?: "default" | "minimal" | "sticky";
}

export const ConfigFormActionBar: React.FC<ConfigFormActionBarProps> = ({
  onSubmit,
  onReset,
  onCancel,
  dirty = false,
  submitting = false,
  canSubmit = true,
  extraActions,
  variant = "default",
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-config-form-action-bar tf-config-form-action-bar--${variant} ${dirty ? "tf-config-form-action-bar--dirty" : ""} ${className}`} style={style} data-testid="config-form-action-bar" {...rest}>
    <div className="tf-config-form-action-bar__primary">
      {onSubmit && (
        <button
          className="tf-config-form-action-bar__submit"
          onClick={onSubmit}
          disabled={!canSubmit || submitting || !dirty}
          type="submit"
        >
          {submitting ? (
            <>
              <span className="tf-config-form-action-bar__spinner" />
              Saving...
            </>
          ) : (
            "Save Configuration"
          )}
        </button>
      )}
      {onReset && (
        <button
          className="tf-config-form-action-bar__reset"
          onClick={onReset}
          disabled={submitting || !dirty}
          type="button"
        >
          Reset
        </button>
      )}
      {onCancel && (
        <button className="tf-config-form-action-bar__cancel" onClick={onCancel} disabled={submitting} type="button">
          Cancel
        </button>
      )}
    </div>
    {!dirty && <span className="tf-config-form-action-bar__saved">All changes saved</span>}
    {extraActions && <div className="tf-config-form-action-bar__extra">{extraActions}</div>}
  </div>
);

ConfigFormActionBar.displayName = "ConfigFormActionBar";
export default ConfigFormActionBar;
