/**
 * @fileoverview AuthorityDelegationCard — Active delegations.
 *
 * Displays one active authority delegation with from/to, level,
 * expiry, and reason. Includes revoke action.
 */

import React from "react";
import { AuthorityDelegation, AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface AuthorityDelegationCardProps extends GovernanceComponentBaseProps {
  delegation: AuthorityDelegation;
  onRevoke?: (delegationId: string) => void;
}

/**
 * AuthorityDelegationCard renders a single active delegation.
 */
const AuthorityDelegationCard: React.FC<AuthorityDelegationCardProps> = ({
  delegation,
  onRevoke,
  className = "",
  "data-testid": dataTestId = "authority-delegation-card",
}) => (
  <div
    className={`tf-authority-delegation-card ${className}`.trim()}
    data-testid={dataTestId}
  >
    <div className="tf-authority-delegation-card__header">
      <span className="tf-authority-delegation-card__badge">DELEGATION</span>
      <span className="tf-authority-delegation-card__id">{delegation.id}</span>
    </div>
    <div className="tf-authority-delegation-card__parties">
      <span className="tf-authority-delegation-card__from">
        {delegation.fromUser} ({delegation.fromRole})
      </span>
      <span className="tf-authority-delegation-card__arrow">→</span>
      <span className="tf-authority-delegation-card__to">
        {delegation.toUser} ({delegation.toRole})
      </span>
    </div>
    <div className="tf-authority-delegation-card__details">
      <span className="tf-authority-delegation-card__authority">
        AUTH {delegation.level} · {AUTHORITY_LEVELS[delegation.level]}
      </span>
      <span className="tf-authority-delegation-card__expiry">
        EXPIRES {delegation.expiresAt}
      </span>
    </div>
    <p className="tf-authority-delegation-card__reason">{delegation.reason}</p>
    {onRevoke && (
      <button
        type="button"
        className="tf-btn tf-btn--revoke"
        onClick={() => onRevoke(delegation.id)}
        data-testid="delegation-revoke-btn"
      >
        REVOKE
      </button>
    )}
  </div>
);

AuthorityDelegationCard.displayName = "AuthorityDelegationCard";

export default AuthorityDelegationCard;
