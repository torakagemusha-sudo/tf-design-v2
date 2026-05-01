import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * PropertyPanelActionBar — save/cancel/reset action bar for property panels.
 *
 * @example
 * <PropertyPanelActionBar onSave={handleSave} onCancel={handleCancel} onReset={handleReset} dirty={true} />
 */
export interface PropertyPanelActionBarProps extends BaseComponentProps {
  /** Save handler */
  onSave?: () => void | Promise<void>;
  /** Cancel handler */
  onCancel?: () => void;
  /** Reset handler */
  onReset?: () => void;
  /** Whether there are unsaved changes */
  dirty?: boolean;
  /** Whether currently saving */
  saving?: boolean;
  /** Whether save is valid/enabled */
  canSave?: boolean;
  /** Additional actions */
  extraActions?: ReactNode;
  /** Variant */
  variant?: "default" | "compact" | "minimal";
}

export const PropertyPanelActionBar: React.FC<PropertyPanelActionBarProps> = ({
  onSave,
  onCancel,
  onReset,
  dirty = false,
  saving = false,
  canSave = true,
  extraActions,
  variant = "default",
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-property-panel-action-bar tf-property-panel-action-bar--${variant} ${dirty ? "tf-property-panel-action-bar--dirty" : ""} ${className}`} style={style} data-testid="property-panel-action-bar" {...rest}>
    <div className="tf-property-panel-action-bar__primary">
      {onSave && (
        <button
          className="tf-property-panel-action-bar__save"
          onClick={onSave}
          disabled={!canSave || saving || !dirty}
          type="button"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      )}
      {onCancel && (
        <button className="tf-property-panel-action-bar__cancel" onClick={onCancel} type="button" disabled={saving}>
          Cancel
        </button>
      )}
      {onReset && (
        <button className="tf-property-panel-action-bar__reset" onClick={onReset} type="button" disabled={saving || !dirty}>
          Reset
        </button>
      )}
    </div>
    {extraActions && <div className="tf-property-panel-action-bar__extra">{extraActions}</div>}
  </div>
);

PropertyPanelActionBar.displayName = "PropertyPanelActionBar";
export default PropertyPanelActionBar;
