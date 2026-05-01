import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * ConfigVersionSelector — dropdown for selecting configuration versions.
 *
 * @example
 * <ConfigVersionSelector versions={versions} selected="v3" onChange={handleChange} />
 */
export interface ConfigVersionSelectorProps extends BaseComponentProps {
  versions: ConfigVersion[];
  selected?: string;
  onChange: (versionId: string) => void;
  /** Show changelog in dropdown */
  showChangelog?: boolean;
  /** Compare mode */
  compare?: boolean;
  onCompareSelect?: (versionId: string) => void;
  compareSelected?: string;
}

export const ConfigVersionSelector: React.FC<ConfigVersionSelectorProps> = ({
  versions,
  selected,
  onChange,
  showChangelog = false,
  compare = false,
  onCompareSelect,
  compareSelected,
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-config-version-selector ${className}`} style={style} data-testid="config-version-selector" {...rest}>
    <div className="tf-config-version-selector__current">
      <select
        className="tf-config-version-selector__select"
        value={selected || ""}
        onChange={e => onChange(e.target.value)}
      >
        {versions.map(v => (
          <option key={v.id} value={v.id}>
            {v.label}{v.current ? " (current)" : ""}
          </option>
        ))}
      </select>
    </div>
    {compare && onCompareSelect && (
      <div className="tf-config-version-selector__compare">
        <span className="tf-config-version-selector__vs">vs</span>
        <select
          className="tf-config-version-selector__select"
          value={compareSelected || ""}
          onChange={e => onCompareSelect(e.target.value)}
        >
          <option value="">Select version...</option>
          {versions.map(v => (
            <option key={v.id} value={v.id}>{v.label}</option>
          ))}
        </select>
      </div>
    )}
    {showChangelog && selected && (
      <div className="tf-config-version-selector__changelog">
        {versions.find(v => v.id === selected)?.changelog}
      </div>
    )}
  </div>
);

ConfigVersionSelector.displayName = "ConfigVersionSelector";
export default ConfigVersionSelector;
