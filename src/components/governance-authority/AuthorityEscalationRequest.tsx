/**
 * @fileoverview AuthorityEscalationRequest — Request higher authority.
 *
 * Form for requesting escalation to a higher authority level.
 * Requires reason and target level selection.
 */

import React, { useState } from "react";
import { AuthorityLevel, AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface AuthorityEscalationRequestProps extends GovernanceComponentBaseProps {
  currentLevel: AuthorityLevel;
  onSubmit: (requestedLevel: AuthorityLevel, reason: string) => void;
}

/**
 * AuthorityEscalationRequest renders an escalation request form.
 */
const AuthorityEscalationRequest: React.FC<AuthorityEscalationRequestProps> = ({
  currentLevel,
  onSubmit,
  className = "",
  "data-testid": dataTestId = "authority-escalation-request",
}) => {
  const [level, setLevel] = useState<AuthorityLevel>(
    Math.min(currentLevel + 1, 6) as AuthorityLevel
  );
  const [reason, setReason] = useState("");

  const levels: AuthorityLevel[] = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div
      className={`tf-authority-escalation-request ${className}`.trim()}
      data-testid={dataTestId}
    >
      <span className="tf-authority-escalation-request__label">
        ESCALATION REQUEST
      </span>
      <div className="tf-authority-escalation-request__levels">
        {levels.map((lvl) => (
          <button
            key={lvl}
            type="button"
            className={`tf-escalation-level ${
              level === lvl ? "tf-escalation-level--selected" : ""
            } ${lvl <= currentLevel ? "tf-escalation-level--disabled" : ""}`}
            disabled={lvl <= currentLevel}
            onClick={() => setLevel(lvl)}
            data-testid={`escalation-level-${lvl}`}
          >
            AUTH {lvl} · {AUTHORITY_LEVELS[lvl]}
          </button>
        ))}
      </div>
      <label className="tf-authority-escalation-request__reason-label" htmlFor="escalation-reason">
        REASON
      </label>
      <textarea
        id="escalation-reason"
        className="tf-authority-escalation-request__reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Justify the authority escalation request…"
        rows={3}
        data-testid="escalation-reason-input"
      />
      <button
        type="button"
        className="tf-btn tf-btn--submit"
        disabled={!reason.trim()}
        onClick={() => onSubmit(level, reason)}
        data-testid="escalation-submit-btn"
      >
        SUBMIT ESCALATION REQUEST
      </button>
    </div>
  );
};

AuthorityEscalationRequest.displayName = "AuthorityEscalationRequest";

export default AuthorityEscalationRequest;
