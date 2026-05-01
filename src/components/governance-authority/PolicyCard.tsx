/**
 * @fileoverview PolicyCard — Single policy card.
 *
 * Displays a policy summary: name, description, version, active status,
 * rule count, and authority requirement. Click to view details.
 */

import React from "react";
import { Policy, AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface PolicyCardProps extends GovernanceComponentBaseProps {
  policy: Policy;
  onSelect?: (policy: Policy) => void;
  onEdit?: (policy: Policy) => void;
  onToggleActive?: (policyId: string, active: boolean) => void;
}

/**
 * PolicyCard renders a single policy summary card.
 */
const PolicyCard: React.FC<PolicyCardProps> = ({
  policy,
  onSelect,
  onEdit,
  onToggleActive,
  className = "",
  "data-testid": dataTestId,
}) => (
  <div
    className={`tf-policy-card ${policy.active ? "tf-policy-card--active" : "tf-policy-card--inactive"} ${className}`.trim()}
    data-testid={dataTestId || `policy-card-${policy.id}`}
    onClick={() => onSelect?.(policy)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onSelect?.(policy)}
  >
    <div className="tf-policy-card__header">
      <h4 className="tf-policy-card__name">{policy.name}</h4>
      <span className="tf-policy-card__version">v{policy.version}</span>
    </div>
    <p className="tf-policy-card__description">{policy.description}</p>
    <div className="tf-policy-card__meta">
      <span className="tf-policy-card__rules">{policy.rules.length} RULES</span>
      <span className="tf-policy-card__authority">
        AUTH {policy.requiredAuthority} · {AUTHORITY_LEVELS[policy.requiredAuthority]}
      </span>
      <span
        className={`tf-policy-card__status ${
          policy.active ? "tf-policy-card__status--active" : "tf-policy-card__status--inactive"
        }`}
      >
        {policy.active ? "ACTIVE" : "INACTIVE"}
      </span>
    </div>
    <div className="tf-policy-card__actions">
      <button
        type="button"
        className="tf-btn tf-btn--edit"
        onClick={(e) => {
          e.stopPropagation();
          onEdit?.(policy);
        }}
        data-testid="policy-card-edit"
      >
        EDIT
      </button>
      <button
        type="button"
        className={`tf-btn ${policy.active ? "tf-btn--deactivate" : "tf-btn--activate"}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleActive?.(policy.id, !policy.active);
        }}
        data-testid="policy-card-toggle"
      >
        {policy.active ? "DEACTIVATE" : "ACTIVATE"}
      </button>
    </div>
  </div>
);

PolicyCard.displayName = "PolicyCard";

export default PolicyCard;
