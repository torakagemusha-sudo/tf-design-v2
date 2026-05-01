/**
 * @fileoverview OverridePanelAuthority — Authority level selector.
 *
 * Lets the operator choose the authority level to escalate to,
 * constrained by their maximum escalation ceiling.
 */

import React from "react";
import { AuthorityLevel, AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface OverridePanelAuthorityProps extends GovernanceComponentBaseProps {
  currentAuthority: AuthorityLevel;
  maxEscalation: AuthorityLevel;
  selected: AuthorityLevel;
  onSelect: (level: AuthorityLevel) => void;
}

/**
 * OverridePanelAuthority renders an authority level selector.
 */
const OverridePanelAuthority: React.FC<OverridePanelAuthorityProps> = ({
  currentAuthority,
  maxEscalation,
  selected,
  onSelect,
  className = "",
  "data-testid": dataTestId = "override-panel-authority",
}) => {
  const levels: AuthorityLevel[] = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div
      className={`tf-override-panel-authority ${className}`.trim()}
      data-testid={dataTestId}
    >
      <span className="tf-override-panel-authority__label">TARGET AUTHORITY LEVEL</span>
      <div className="tf-override-panel-authority__options">
        {levels.map((level) => {
          const disabled = level < currentAuthority || level > maxEscalation;
          return (
            <button
              key={level}
              type="button"
              className={`tf-override-auth-option ${
                selected === level
                  ? "tf-override-auth-option--selected"
                  : ""
              } ${disabled ? "tf-override-auth-option--disabled" : ""}`}
              disabled={disabled}
              onClick={() => onSelect(level)}
              data-testid={`override-auth-${level}`}
            >
              <span className="tf-override-auth-option__level">AUTH {level}</span>
              <span className="tf-override-auth-option__name">
                {AUTHORITY_LEVELS[level]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

OverridePanelAuthority.displayName = "OverridePanelAuthority";

export default OverridePanelAuthority;
