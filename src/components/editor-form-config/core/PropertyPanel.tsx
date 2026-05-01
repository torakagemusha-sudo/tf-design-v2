import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * PropertyPanel — side panel for editing entity/node properties.
 * Provides a scrollable, sectioned interface for property editing.
 *
 * @example
 * <PropertyPanel title="Entity Settings" sections={sections} onChange={handleChange} />
 */
export interface PropertyPanelProps extends BaseComponentProps {
  /** Panel title displayed in header */
  title: string;
  /** Subtitle or context line */
  subtitle?: string;
  /** Grouped property sections */
  sections: PropertyPanelSection[];
  /** Called when any property value changes */
  onChange: (key: string, value: unknown) => void;
  /** Called when panel requests close */
  onClose?: () => void;
  /** Width in pixels or css value */
  width?: number | string;
  /** Whether panel is visible */
  open?: boolean;
  /** Collapsed section ids */
  collapsedSections?: string[];
  /** Loading state */
  loading?: boolean;
  /** Children for custom footer */
  children?: ReactNode;
}

export interface PropertyPanelSection {
  id: string;
  label: string;
  icon?: ReactNode;
  properties: PropertyDefinition[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  description?: string;
}

/**
 * PropertyPanel renders a governed, sectioned side panel for property editing.
 */
export const PropertyPanel: React.FC<PropertyPanelProps> = ({
  title,
  subtitle,
  sections,
  onChange,
  onClose,
  width = 320,
  open = true,
  collapsedSections = [],
  loading = false,
  className = "",
  style,
  children,
  ...rest
}) => {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set(collapsedSections));

  const toggleSection = useCallback((id: string) => {
    setCollapsed(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  if (!open) return null;

  const widthStyle = typeof width === "number" ? `${width}px` : width;

  return (
    <aside
      className={`tf-property-panel tf-property-panel--open ${className}`}
      style={{ width: widthStyle, ...style }}
      data-testid="property-panel"
      {...rest}
    >
      <div className="tf-property-panel__surface">
        <header className="tf-property-panel__header">
          <div className="tf-property-panel__title-row">
            <h3 className="tf-property-panel__title">{title}</h3>
            {onClose && (
              <button className="tf-property-panel__close" onClick={onClose} aria-label="Close panel">
                <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
              </button>
            )}
          </div>
          {subtitle && <p className="tf-property-panel__subtitle">{subtitle}</p>}
        </header>

        <div className="tf-property-panel__body">
          {loading ? (
            <div className="tf-property-panel__skeleton">
              <div className="tf-skeleton tf-skeleton--line" />
              <div className="tf-skeleton tf-skeleton--line" />
              <div className="tf-skeleton tf-skeleton--line" />
            </div>
          ) : (
            sections.map(section => (
              <PropertyPanelSectionComponent
                key={section.id}
                section={section}
                isCollapsed={collapsed.has(section.id)}
                onToggle={() => toggleSection(section.id)}
                onPropertyChange={onChange}
              />
            ))
          )}
        </div>

        {children && <footer className="tf-property-panel__footer">{children}</footer>}
      </div>
    </aside>
  );
};

PropertyPanel.displayName = "PropertyPanel";

/** Collapsible section within PropertyPanel */
const PropertyPanelSectionComponent: React.FC<{
  section: PropertyPanelSection;
  isCollapsed: boolean;
  onToggle: () => void;
  onPropertyChange: (key: string, value: unknown) => void;
}> = ({ section, isCollapsed, onToggle, onPropertyChange }) => (
  <div className={`tf-property-panel__section ${isCollapsed ? "tf-property-panel__section--collapsed" : ""}`}>
    <button className="tf-property-panel__section-header" onClick={onToggle}>
      {section.icon && <span className="tf-property-panel__section-icon">{section.icon}</span>}
      <span className="tf-property-panel__section-label">{section.label}</span>
      <svg
        className={`tf-property-panel__section-chevron ${isCollapsed ? "" : "tf-property-panel__section-chevron--expanded"}`}
        width="12" height="12" viewBox="0 0 12 12"
      >
        <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      </svg>
    </button>
    {!isCollapsed && (
      <div className="tf-property-panel__section-content">
        {section.description && (
          <p className="tf-property-panel__section-desc">{section.description}</p>
        )}
        {section.properties.map(prop => (
          <PropertyPanelFieldComponent key={prop.key} property={prop} onChange={onPropertyChange} />
        ))}
      </div>
    )}
  </div>
);

/** Individual property field renderer */
const PropertyPanelFieldComponent: React.FC<{
  property: PropertyDefinition;
  onChange: (key: string, value: unknown) => void;
}> = ({ property, onChange }) => {
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = property.type === "boolean" ? (e.target as HTMLInputElement).checked : e.target.value;
    onChange(property.key, val);
  }, [property.key, property.type, onChange]);

  return (
    <div className={`tf-property-panel__field ${property.required ? "tf-property-panel__field--required" : ""}`}>
      <label className="tf-property-panel__field-label" htmlFor={`ppf-${property.key}`}>
        {property.label}
        {property.required && <span className="tf-property-panel__field-required">*</span>}
      </label>
      {property.description && (
        <span className="tf-property-panel__field-desc">{property.description}</span>
      )}
      {property.type === "select" && property.options ? (
        <select
          id={`ppf-${property.key}`}
          className="tf-property-panel__field-input tf-property-panel__field-input--select"
          value={String(property.value ?? "")}
          onChange={handleChange}
          disabled={property.disabled}
        >
          {property.options.map(opt => (
            <option key={String(opt.value)} value={String(opt.value)}>{opt.label}</option>
          ))}
        </select>
      ) : property.type === "boolean" ? (
        <label className="tf-property-panel__field-toggle">
          <input
            id={`ppf-${property.key}`}
            type="checkbox"
            className="tf-property-panel__field-checkbox"
            checked={!!property.value}
            onChange={handleChange}
            disabled={property.disabled}
          />
          <span className="tf-property-panel__field-toggle-track">
            <span className="tf-property-panel__field-toggle-thumb" />
          </span>
        </label>
      ) : (
        <input
          id={`ppf-${property.key}`}
          type={property.type === "number" ? "number" : "text"}
          className="tf-property-panel__field-input"
          value={String(property.value ?? "")}
          placeholder={property.placeholder}
          onChange={handleChange}
          readOnly={property.readonly}
          disabled={property.disabled}
        />
      )}
    </div>
  );
};

export default PropertyPanel;
