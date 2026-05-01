import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * PropertyPanelHeader — panel header with context, breadcrumbs, and actions.
 *
 * @example
 * <PropertyPanelHeader title="User Entity" breadcrumbs={["Schema", "Entities"]} actions={<Button>Save</Button>} />
 */
export interface PropertyPanelHeaderProps extends BaseComponentProps {
  /** Panel title */
  title: string;
  /** Breadcrumb segments */
  breadcrumbs?: string[];
  /** Action elements (buttons, icons) */
  actions?: ReactNode;
  /** Icon or avatar to display left of title */
  icon?: ReactNode;
  /** Variant style */
  variant?: "default" | "compact" | " prominent";
  /** Whether the header is sticky */
  sticky?: boolean;
}

export const PropertyPanelHeader: React.FC<PropertyPanelHeaderProps> = ({
  title,
  breadcrumbs = [],
  actions,
  icon,
  variant = "default",
  sticky = false,
  className = "",
  style,
  ...rest
}) => (
  <header
    className={`tf-property-panel-header tf-property-panel-header--${variant} ${sticky ? "tf-property-panel-header--sticky" : ""} ${className}`}
    style={style}
    data-testid="property-panel-header"
    {...rest}
  >
    {breadcrumbs.length > 0 && (
      <nav className="tf-property-panel-header__breadcrumbs">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="tf-property-panel-header__crumb">
            {i > 0 && <span className="tf-property-panel-header__crumb-sep">/</span>}
            <span className="tf-property-panel-header__crumb-text">{crumb}</span>
          </span>
        ))}
      </nav>
    )}
    <div className="tf-property-panel-header__row">
      {icon && <span className="tf-property-panel-header__icon">{icon}</span>}
      <h3 className="tf-property-panel-header__title">{title}</h3>
      {actions && <div className="tf-property-panel-header__actions">{actions}</div>}
    </div>
  </header>
);

PropertyPanelHeader.displayName = "PropertyPanelHeader";
export default PropertyPanelHeader;
