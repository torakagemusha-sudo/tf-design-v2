/**
 * @fileoverview PrivacySettingsPanel — Privacy settings.
 *
 * Displays and edits privacy-related settings (data sharing,
 * collection, retention) with authority requirements per setting.
 *
 * Torafirma Governance Component — Authority Gold / Dark Theme
 */

import React from "react";
import { PrivacySetting, AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface PrivacySettingsPanelProps extends GovernanceComponentBaseProps {
  settings: PrivacySetting[];
  currentAuthority: number;
  onChange: (settingId: string, value: "allow" | "deny" | "ask" | "minimal") => void;
}

const valueClassMap: Record<string, string> = {
  allow: "tf-privacy-setting--allow",
  deny: "tf-privacy-setting--deny",
  ask: "tf-privacy-setting--ask",
  minimal: "tf-privacy-setting--minimal",
};

const valueOptions: PrivacySetting["value"][] = ["allow", "deny", "ask", "minimal"];

/**
 * PrivacySettingsPanel renders all privacy settings.
 */
const PrivacySettingsPanel: React.FC<PrivacySettingsPanelProps> = ({
  settings,
  currentAuthority,
  onChange,
  className = "",
  "data-testid": dataTestId = "privacy-settings-panel",
}) => (
  <div
    className={`tf-privacy-settings-panel ${className}`.trim()}
    data-testid={dataTestId}
  >
    <h3 className="tf-privacy-settings-panel__title">PRIVACY SETTINGS</h3>
    <ul className="tf-privacy-settings-list">
      {settings.map((setting) => {
        const editable =
          setting.editable && currentAuthority >= setting.authorityRequired;
        return (
          <li
            key={setting.id}
            className={`tf-privacy-setting ${valueClassMap[setting.value]}`}
            data-testid={`privacy-setting-${setting.id}`}
          >
            <div className="tf-privacy-setting__info">
              <span className="tf-privacy-setting__label">{setting.label}</span>
              <span className="tf-privacy-setting__description">
                {setting.description}
              </span>
              <span className="tf-privacy-setting__authority">
                REQUIRES AUTH {setting.authorityRequired} ·{" "}
                {AUTHORITY_LEVELS[setting.authorityRequired as 0 | 1 | 2 | 3 | 4 | 5 | 6]}
              </span>
            </div>
            <div className="tf-privacy-setting__controls">
              {valueOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`tf-privacy-value ${
                    setting.value === opt ? "tf-privacy-value--selected" : ""
                  }`}
                  disabled={!editable}
                  onClick={() => onChange(setting.id, opt)}
                  data-testid={`privacy-${setting.id}-${opt}`}
                >
                  {opt.toUpperCase()}
                </button>
              ))}
            </div>
            {!editable && (
              <span className="tf-privacy-setting__locked">LOCKED</span>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);

PrivacySettingsPanel.displayName = "PrivacySettingsPanel";

export default PrivacySettingsPanel;
