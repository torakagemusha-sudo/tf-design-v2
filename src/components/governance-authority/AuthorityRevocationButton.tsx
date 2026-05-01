/**
 * @fileoverview AuthorityRevocationButton — Revoke authority.
 *
 * Destructive button for revoking all active authority delegations.
 * Shows count of active delegations and requires confirmation.
 */

import React from "react";
import { GovernanceComponentBaseProps } from "./types";

export interface AuthorityRevocationButtonProps extends GovernanceComponentBaseProps {
  delegationCount: number;
  onRevokeAll?: () => void;
}

/**
 * AuthorityRevocationButton renders the revoke-all delegations control.
 */
const AuthorityRevocationButton: React.FC<AuthorityRevocationButtonProps> = ({
  delegationCount,
  onRevokeAll,
  className = "",
  "data-testid": dataTestId = "authority-revocation-button",
}) => {
  if (delegationCount === 0) return null;

  return (
    <div
      className={`tf-authority-revocation-button ${className}`.trim()}
      data-testid={dataTestId}
    >
      <span className="tf-authority-revocation-button__count">
        {delegationCount} ACTIVE DELEGATION{delegationCount !== 1 ? "S" : ""}
      </span>
      <button
        type="button"
        className="tf-btn tf-btn--revoke-all"
        onClick={() => {
          if (
            window.confirm(
              `Revoke all ${delegationCount} active delegation(s)? This cannot be undone.`
            )
          ) {
            onRevokeAll?.();
          }
        }}
        data-testid="revoke-all-btn"
      >
        REVOKE ALL DELEGATIONS
      </button>
    </div>
  );
};

AuthorityRevocationButton.displayName = "AuthorityRevocationButton";

export default AuthorityRevocationButton;
