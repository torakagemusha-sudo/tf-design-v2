import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * ConfigTemplateGallery — gallery of configuration templates with preview.
 *
 * @example
 * <ConfigTemplateGallery templates={templates} onSelect={handleSelect} />
 */
export interface ConfigTemplateGalleryProps extends BaseComponentProps {
  templates: ConfigTemplate[];
  onSelect: (template: ConfigTemplate) => void;
  /** Filter by category */
  categories?: string[];
  /** Currently selected template */
  selectedId?: string;
}

export const ConfigTemplateGallery: React.FC<ConfigTemplateGalleryProps> = ({
  templates,
  onSelect,
  categories,
  selectedId,
  className = "",
  style,
  ...rest
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const cats = useMemo(() => {
    const c = new Set(templates.map(t => t.category));
    return ["all", ...Array.from(c)];
  }, [templates]);

  const filtered = useMemo(() =>
    activeCategory === "all" ? templates : templates.filter(t => t.category === activeCategory),
  [templates, activeCategory]);

  return (
    <div className={`tf-config-template-gallery ${className}`} style={style} data-testid="config-template-gallery" {...rest}>
      <div className="tf-config-template-gallery__filters">
        {cats.map(c => (
          <button
            key={c}
            type="button"
            className={`tf-config-template-gallery__filter ${activeCategory === c ? "tf-config-template-gallery__filter--active" : ""}`}
            onClick={() => setActiveCategory(c)}
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>
      <div className="tf-config-template-gallery__grid">
        {filtered.map(t => (
          <button
            key={t.id}
            type="button"
            className={`tf-config-template-gallery__card ${selectedId === t.id ? "tf-config-template-gallery__card--selected" : ""}`}
            onClick={() => onSelect(t)}
          >
            {t.thumbnail ? (
              <img src={t.thumbnail} alt={t.name} className="tf-config-template-gallery__thumb" />
            ) : (
              <div className="tf-config-template-gallery__placeholder">
                <svg width="24" height="24" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" fill="none" strokeWidth="1.5"/><path d="M3 9h18M9 3v18" stroke="currentColor" strokeWidth="1"/></svg>
              </div>
            )}
            <span className="tf-config-template-gallery__name">{t.name}</span>
            <span className="tf-config-template-gallery__desc">{t.description}</span>
            <div className="tf-config-template-gallery__tags">
              {t.tags.map(tag => <span key={tag} className="tf-config-template-gallery__tag">{tag}</span>)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

ConfigTemplateGallery.displayName = "ConfigTemplateGallery";
export default ConfigTemplateGallery;
