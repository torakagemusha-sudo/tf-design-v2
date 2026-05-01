/**
 * @fileoverview AuthorityLadderCurrent — Current level indicator.
 *
 * Displays the operator's current authority level badge.
 */

import React from "react";
import { AuthorityLevel, AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface AuthorityLadderCurrentProps extends GovernanceComponentBaseProps {
  level: AuthorityLevel;
}

/**
 * AuthorityLadderCurrent renders the current authority level badge.
 */
const AuthorityLadderCurrent: React.FC<AuthorityLadderCurrentProps> = ({
  level,
  className = "",
  "data-testid": dataTestId = "authority-ladder-current",
}) => (
  <div
    className={`tf-auth-ladder-current ${className}`.trim()}
    data-testid={dataTestId}
  >
    <span className="tf-auth-ladder-current__label">CURRENT</span>
    <span className="tf-auth-ladder-current__value">
      AUTH {level} · {AUTHORITY_LEVELS[level]}
    </span>
  </div>
);

AuthorityLadderCurrent.displayName = "AuthorityLadderCurrent";

export default AuthorityLadderCurrent;
