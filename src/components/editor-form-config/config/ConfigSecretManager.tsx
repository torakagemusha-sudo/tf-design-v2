import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * ConfigSecretManager — secret key manager with masking, rotation, and expiry.
 *
 * @example
 * <ConfigSecretManager secrets={secrets} onChange={setSecrets} />
 */
export interface ConfigSecretManagerProps extends BaseComponentProps {
  secrets: SecretEntry[];
  onChange: (secrets: SecretEntry[]) => void;
  readonly?: boolean;
  /** Warn when secret expires within N days */
  expiryWarningDays?: number;
}

export const ConfigSecretManager: React.FC<ConfigSecretManagerProps> = ({
  secrets,
  onChange,
  readonly = false,
  expiryWarningDays = 7,
  className = "",
  style,
  ...rest
}) => {
  const toggleMask = useCallback((id: string) => {
    onChange(secrets.map(s => s.id === id ? { ...s, masked: !s.masked } : s));
  }, [secrets, onChange]);

  const rotateSecret = useCallback((id: string) => {
    onChange(secrets.map(s => s.id === id ? { ...s, lastRotated: Date.now() } : s));
  }, [secrets, onChange]);

  const removeSecret = useCallback((id: string) => {
    onChange(secrets.filter(s => s.id !== id));
  }, [secrets, onChange]);

  const now = Date.now();

  return (
    <div className={`tf-config-secret-manager ${className}`} style={style} data-testid="config-secret-manager" {...rest}>
      <div className="tf-config-secret-manager__header">
        <span className="tf-config-secret-manager__title">Secrets ({secrets.length})</span>
        {!readonly && (
          <button type="button" className="tf-config-secret-manager__add" onClick={() => onChange([...secrets, { id: `sec_${Date.now()}`, name: "", value: "", masked: true }])}>
            + Add Secret
          </button>
        )}
      </div>
      <div className="tf-config-secret-manager__list">
        {secrets.map(secret => {
          const expiresSoon = secret.expiresAt && (secret.expiresAt - now) < expiryWarningDays * 86400000;
          return (
            <div key={secret.id} className={`tf-config-secret-manager__item ${expiresSoon ? "tf-config-secret-manager__item--expiring" : ""}`}>
              <input
                className="tf-config-secret-manager__name"
                value={secret.name}
                onChange={e => onChange(secrets.map(s => s.id === secret.id ? { ...s, name: e.target.value } : s))}
                placeholder="Secret name"
                disabled={readonly}
              />
              <div className="tf-config-secret-manager__value-wrap">
                <input
                  className="tf-config-secret-manager__value"
                  type={secret.masked ? "password" : "text"}
                  value={secret.value}
                  onChange={e => onChange(secrets.map(s => s.id === secret.id ? { ...s, value: e.target.value } : s))}
                  placeholder="Secret value"
                  disabled={readonly}
                />
                <button type="button" className="tf-config-secret-manager__mask" onClick={() => toggleMask(secret.id)} title={secret.masked ? "Reveal" : "Mask"}>
                  {secret.masked ? "👁️" : "🙈"}
                </button>
              </div>
              <div className="tf-config-secret-manager__meta">
                {secret.lastRotated && <span className="tf-config-secret-manager__rotated">Rotated: {new Date(secret.lastRotated).toLocaleDateString()}</span>}
                {secret.expiresAt && <span className={`tf-config-secret-manager__expires ${expiresSoon ? "tf-config-secret-manager__expires--soon" : ""}`}>Expires: {new Date(secret.expiresAt).toLocaleDateString()}</span>}
              </div>
              <div className="tf-config-secret-manager__actions">
                <button type="button" className="tf-config-secret-manager__rotate" onClick={() => rotateSecret(secret.id)} title="Mark as rotated">↻</button>
                {!readonly && <button type="button" className="tf-config-secret-manager__remove" onClick={() => removeSecret(secret.id)}>×</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

ConfigSecretManager.displayName = "ConfigSecretManager";
export default ConfigSecretManager;
