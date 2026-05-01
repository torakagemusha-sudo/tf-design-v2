import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * PropertyPanelSection — collapsible section for the property panel.
 * Independent, reusable section component with animated collapse.
 *
 * @example
 * <PropertyPanelSection label="Appearance" collapsible defaultCollapsed>
 *   <div>Section content</div>
 * </PropertyPanelSection>
 */
export interface PropertyPanelSectionProps extends BaseComponentProps {
  /** Section label */
  label: string;
  /** Icon element */
  icon?: ReactNode;
  /** Section children/content */
  children?: ReactNode;
  /** Whether section can be collapsed */
  collapsible?: boolean;
  /** Default collapsed state */
  defaultCollapsed?: boolean;
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Callback on collapse toggle */
  onCollapseChange?: (collapsed: boolean) => void;
  /** Badge count or label */
  badge?: string | number;
  /** Error count for the section */
  errorCount?: number;
  /** Whether section has unsaved changes */
  dirty?: boolean;
}

export const PropertyPanelSection: React.FC<PropertyPanelSectionProps> = ({
  label,
  icon,
  children,
  collapsible = true,
  defaultCollapsed = false,
  collapsed: controlledCollapsed,
  onCollapseChange,
  badge,
  errorCount = 0,
  dirty = false,
  className = "",
  style,
  ...rest
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const handleToggle = useCallback(() => {
    const next = !isCollapsed;
    if (controlledCollapsed === undefined) setInternalCollapsed(next);
    onCollapseChange?.(next);
  }, [isCollapsed, controlledCollapsed, onCollapseChange]);

  return (
    <div className={`tf-property-panel-section ${isCollapsed ? "tf-property-panel-section--collapsed" : ""} ${dirty ? "tf-property-panel-section--dirty" : ""} ${errorCount > 0 ? "tf-property-panel-section--error" : ""} ${className}`} style={style} data-testid="property-panel-section" {...rest}>
      <button
        className={`tf-property-panel-section__header ${collapsible ? "tf-property-panel-section__header--collapsible" : ""}`}
        onClick={collapsible ? handleToggle : undefined}
        type="button"
      >
        {icon && <span className="tf-property-panel-section__icon">{icon}</span>}
        <span className="tf-property-panel-section__label">{label}</span>
        {badge !== undefined && <span className="tf-property-panel-section__badge">{badge}</span>}
        {errorCount > 0 && <span className="tf-property-panel-section__error-badge">{errorCount}</span>}
        {dirty && <span className="tf-property-panel-section__dirty-indicator" />}
        {collapsible && (
          <svg className={`tf-property-panel-section__chevron ${isCollapsed ? "" : "tf-property-panel-section__chevron--expanded"}`} width="10" height="10" viewBox="0 0 10 10">
            <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
          </svg>
        )}
      </button>
      {!isCollapsed && <div className="tf-property-panel-section__content">{children}</div>}
    </div>
  );
};

PropertyPanelSection.displayName = "PropertyPanelSection";
export default PropertyPanelSection;
