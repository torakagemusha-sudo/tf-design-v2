/**
 * @fileoverview PolicyActionSelector — Select policy actions.
 *
 * Displays available policy actions as selectable items with
 * their command class, target type, and required authority.
 */

import React from "react";
import { PolicyAction } from "./types";
import { AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface PolicyActionSelectorProps extends GovernanceComponentBaseProps {
  actions: PolicyAction[];
  selected: string[];
  onToggle: (actionId: string) => void;
}

/**
 * PolicyActionSelector renders selectable policy actions.
 */
const PolicyActionSelector: React.FC<PolicyActionSelectorProps> = ({
  actions,
  selected,
  onToggle,
  className = "",
  "data-testid": dataTestId = "policy-action-selector",
}) => (
  <div
    className={`tf-policy-action-selector ${className}`.trim()}
    data-testid={dataTestId}
  >
    <span className="tf-policy-action-selector__label">POLICY ACTIONS</span>
    <ul className="tf-policy-action-list">
      {actions.map((action) => {
        const isSelected = selected.includes(action.id);
        return (
          <li
            key={action.id}
            className={`tf-policy-action-item ${
              isSelected ? "tf-policy-action-item--selected" : ""
            }`}
            onClick={() => onToggle(action.id)}
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onToggle(action.id)}
            data-testid={`policy-action-${action.id}`}
          >
            <span className="tf-policy-action-item__checkbox">
              {isSelected ? "☑" : "☐"}
            </span>
            <span className="tf-policy-action-item__label">{action.label}</span>
            <span className="tf-policy-action-item__class">{action.commandClass}</span>
            <span className="tf-policy-action-item__target">{action.targetType}</span>
            <span className="tf-policy-action-item__authority">
              AUTH {action.requiredAuthority} · {AUTHORITY_LEVELS[action.requiredAuthority]}
            </span>
          </li>
        );
      })}
    </ul>
  </div>
);

PolicyActionSelector.displayName = "PolicyActionSelector";

export default PolicyActionSelector;
