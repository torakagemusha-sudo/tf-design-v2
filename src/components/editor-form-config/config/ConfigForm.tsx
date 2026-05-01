import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * ConfigForm — configuration form with sections, validation, and action bars.
 * High-density form for editing application/system configuration.
 *
 * @example
 * <ConfigForm sections={sections} values={config} onChange={handleChange} onSubmit={handleSubmit} />
 */
export interface ConfigFormProps extends BaseComponentProps {
  /** Form sections */
  sections: Array<{
    id: string;
    label: string;
    icon?: ReactNode;
    description?: string;
    fields: FormFieldConfig[];
    collapsible?: boolean;
    defaultCollapsed?: boolean;
  }>;
  /** Current form values */
  values: Record<string, unknown>;
  /** Field change handler */
  onChange: (name: string, value: unknown) => void;
  /** Submit handler */
  onSubmit?: (values: Record<string, unknown>) => void | Promise<void>;
  /** Reset handler */
  onReset?: () => void;
  /** Validation errors by field name */
  errors?: Record<string, string>;
  /** Whether form is loading */
  loading?: boolean;
  /** Readonly state */
  readonly?: boolean;
  /** Whether form has unsaved changes */
  dirty?: boolean;
  /** Submitting state */
  submitting?: boolean;
  /** Variant */
  variant?: "default" | "compact" | "wizard";
  /** Children rendered at bottom */
  children?: ReactNode;
}

export const ConfigForm: React.FC<ConfigFormProps> = ({
  sections,
  values,
  onChange,
  onSubmit,
  onReset,
  errors = {},
  loading = false,
  readonly = false,
  dirty = false,
  submitting = false,
  variant = "default",
  className = "",
  style,
  children,
  ...rest
}) => {
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set(sections.filter(s => s.defaultCollapsed).map(s => s.id))
  );

  const toggleSection = useCallback((id: string) => {
    setCollapsedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(values);
  }, [onSubmit, values]);

  return (
    <form
      className={`tf-config-form tf-config-form--${variant} ${loading ? "tf-config-form--loading" : ""} ${dirty ? "tf-config-form--dirty" : ""} ${className}`}
      style={style}
      onSubmit={handleSubmit}
      data-testid="config-form"
      {...rest}
    >
      {sections.map(section => (
        <ConfigFormSection
          key={section.id}
          label={section.label}
          icon={section.icon}
          description={section.description}
          collapsible={section.collapsible}
          collapsed={collapsedSections.has(section.id)}
          onCollapseToggle={() => toggleSection(section.id)}
        >
          <div className="tf-config-form__fields">
            {section.fields.map(field => (
              <ConfigFormField
                key={field.name}
                config={field}
                value={values[field.name]}
                onChange={onChange}
                error={errors[field.name]}
                readonly={readonly}
              />
            ))}
          </div>
        </ConfigFormSection>
      ))}
      {children}
      {(onSubmit || onReset) && (
        <ConfigFormActionBar
          onSubmit={onSubmit ? handleSubmit : undefined}
          onReset={onReset}
          dirty={dirty}
          submitting={submitting}
        />
      )}
    </form>
  );
};

ConfigForm.displayName = "ConfigForm";
export default ConfigForm;
