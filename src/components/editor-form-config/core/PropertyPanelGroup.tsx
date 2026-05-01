import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * PropertyPanelGroup — grouped fields within a section with a border/background.
 *
 * @example
 * <PropertyPanelGroup label="Advanced" collapsible>
 *   <PropertyPanelField property={p1} onChange={handleChange} />
 *   <PropertyPanelField property={p2} onChange={handleChange} />
 * </PropertyGroup>
 */
export interface PropertyPanelGroupProps extends BaseComponentProps {
  /** Group label */
  label: string;
  /** Child field elements */
  children: ReactNode;
  /** Whether group is collapsible */
  collapsible?: boolean;
  /** Default collapsed */
  defaultCollapsed?: boolean;
  /** Help text */
  helpText?: string;
  /** Variant */
  variant?: "default" | "bordered" | "filled";
}

export const PropertyPanelGroup: React.FC<PropertyPanelGroupProps> = ({
  label,
  children,
  collapsible = false,
  defaultCollapsed = false,
  helpText,
  variant = "default",
  className = "",
  style,
  ...rest
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <fieldset className={`tf-property-panel-group tf-property-panel-group--${variant} ${collapsed ? "tf-property-panel-group--collapsed" : ""} ${className}`} style={style} data-testid="property-panel-group" {...rest}>
      <legend className="tf-property-panel-group__legend">
        {collapsible ? (
          <button type="button" className="tf-property-panel-group__toggle" onClick={() => setCollapsed(c => !c)}>
            <svg className={`tf-property-panel-group__chevron ${collapsed ? "" : "tf-property-panel-group__chevron--expanded"}`} width="10" height="10" viewBox="0 0 10 10">
              <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
            </svg>
            {label}
          </button>
        ) : (
          <span>{label}</span>
        )}
      </legend>
      {!collapsed && (
        <div className="tf-property-panel-group__content">
          {helpText && <p className="tf-property-panel-group__help">{helpText}</p>}
          {children}
        </div>
      )}
    </fieldset>
  );
};

PropertyPanelGroup.displayName = "PropertyPanelGroup";
export default PropertyPanelGroup;
