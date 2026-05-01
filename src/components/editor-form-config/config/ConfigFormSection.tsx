import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * ConfigFormSection — collapsible section within a configuration form.
 *
 * @example
 * <ConfigFormSection label="Database" icon={<DbIcon />} collapsible>
 *   <ConfigFormField ... />
 * </ConfigFormSection>
 */
export interface ConfigFormSectionProps extends BaseComponentProps {
  /** Section label */
  label: string;
  /** Section icon */
  icon?: ReactNode;
  /** Description text */
  description?: string;
  /** Child fields/content */
  children: ReactNode;
  /** Whether section is collapsible */
  collapsible?: boolean;
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Default collapsed */
  defaultCollapsed?: boolean;
  /** Collapse toggle callback */
  onCollapseToggle?: () => void;
  /** Error count badge */
  errorCount?: number;
  /** Whether section has been modified */
  dirty?: boolean;
}

export const ConfigFormSection: React.FC<ConfigFormSectionProps> = ({
  label,
  icon,
  description,
  children,
  collapsible = false,
  collapsed,
  defaultCollapsed = false,
  onCollapseToggle,
  errorCount = 0,
  dirty = false,
  className = "",
  style,
  ...rest
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsed = collapsed !== undefined ? collapsed : internalCollapsed;

  const handleToggle = useCallback(() => {
    if (collapsed === undefined) setInternalCollapsed(c => !c);
    onCollapseToggle?.();
  }, [collapsed, onCollapseToggle]);

  return (
    <fieldset
      className={`tf-config-form-section ${isCollapsed ? "tf-config-form-section--collapsed" : ""} ${errorCount > 0 ? "tf-config-form-section--error" : ""} ${dirty ? "tf-config-form-section--dirty" : ""} ${className}`}
      style={style}
      data-testid="config-form-section"
      {...rest}
    >
      <legend className="tf-config-form-section__header" onClick={collapsible ? handleToggle : undefined}>
        {collapsible && (
          <svg className={`tf-config-form-section__chevron ${isCollapsed ? "" : "tf-config-form-section__chevron--expanded"}`} width="10" height="10" viewBox="0 0 10 10">
            <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
          </svg>
        )}
        {icon && <span className="tf-config-form-section__icon">{icon}</span>}
        <span className="tf-config-form-section__label">{label}</span>
        {errorCount > 0 && <span className="tf-config-form-section__badge tf-config-form-section__badge--error">{errorCount}</span>}
        {dirty && <span className="tf-config-form-section__dirty" title="Modified" />}
      </legend>
      {!isCollapsed && (
        <div className="tf-config-form-section__content">
          {description && <p className="tf-config-form-section__desc">{description}</p>}
          {children}
        </div>
      )}
    </fieldset>
  );
};

ConfigFormSection.displayName = "ConfigFormSection";
export default ConfigFormSection;
