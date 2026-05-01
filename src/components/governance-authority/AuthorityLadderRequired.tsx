/**
 * @fileoverview AuthorityLadderRequired — Required level indicator.
 *
 * Displays the authority level required for the pending action.
 */

import React from "react";
import { AuthorityLevel, AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface AuthorityLadderRequiredProps extends GovernanceComponentBaseProps {
  level: AuthorityLevel;
}

/**
 * AuthorityLadderRequired renders the required authority level badge.
 */
const AuthorityLadderRequired: React.FC<AuthorityLadderRequiredProps> = ({
  level,
  className = "",
  "data-testid": dataTestId = "authority-ladder-required",
}) => (
  <div
    className={`tf-auth-ladder-required ${className}`.trim()}
    data-testid={dataTestId}
  >
    <span className="tf-auth-ladder-required__label">REQUIRED</span>
    <span className="tf-auth-ladder-required__value">
      AUTH {level} · {AUTHORITY_LEVELS[level]}
    </span>
  </div>
);

AuthorityLadderRequired.displayName = "AuthorityLadderRequired";

export default AuthorityLadderRequired;
