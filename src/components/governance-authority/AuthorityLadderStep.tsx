/**
 * @fileoverview AuthorityLadderStep — Single authority step.
 *
 * One rung on the authority ladder. Shows the level number and name.
 * Highlighted when active (held), required, or current.
 */

import React from "react";
import { AuthorityLevel, AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface AuthorityLadderStepProps extends GovernanceComponentBaseProps {
  level: AuthorityLevel;
  active: boolean;
  required: boolean;
  current: boolean;
}

/**
 * AuthorityLadderStep renders a single authority ladder rung.
 */
const AuthorityLadderStep: React.FC<AuthorityLadderStepProps> = ({
  level,
  active,
  required,
  current,
  className = "",
  "data-testid": dataTestId,
}) => {
  const modifiers = [
    active ? "tf-auth-step--active" : "",
    required ? "tf-auth-step--required" : "",
    current ? "tf-auth-step--current" : "",
    !active ? "tf-auth-step--inactive" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={`tf-auth-step ${modifiers} ${className}`.trim()}
      data-testid={dataTestId || `auth-step-${level}`}
    >
      <span className="tf-auth-step__number">{level}</span>
      <span className="tf-auth-step__name">{AUTHORITY_LEVELS[level]}</span>
      {current && <span className="tf-auth-step__badge">YOU</span>}
      {required && !active && <span className="tf-auth-step__badge">NEEDED</span>}
    </div>
  );
};

AuthorityLadderStep.displayName = "AuthorityLadderStep";

export default AuthorityLadderStep;
