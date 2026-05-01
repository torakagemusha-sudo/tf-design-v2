/**
 * @fileoverview AuthorityLadder — Visual authority level ladder.
 *
 * Displays all 7 authority levels as a vertical ladder. Shows which
 * level the current session holds, which level is required for the
 * current action, and the gap between them.
 *
 * Torafirma Governance Component — Authority Gold / Dark Theme
 */

import React from "react";
import { AuthorityLevel } from "./types";
import { GovernanceComponentBaseProps } from "./types";
import AuthorityLadderStep from "./AuthorityLadderStep";
import AuthorityLadderCurrent from "./AuthorityLadderCurrent";
import AuthorityLadderRequired from "./AuthorityLadderRequired";
import AuthorityLadderGap from "./AuthorityLadderGap";

export interface AuthorityLadderProps extends GovernanceComponentBaseProps {
  currentLevel: AuthorityLevel;
  requiredLevel: AuthorityLevel;
  onEscalate?: (level: AuthorityLevel) => void;
}

const ALL_LEVELS: AuthorityLevel[] = [0, 1, 2, 3, 4, 5, 6];

/**
 * AuthorityLadder renders a visual authority level indicator.
 */
const AuthorityLadder: React.FC<AuthorityLadderProps> = ({
  currentLevel,
  requiredLevel,
  onEscalate,
  className = "",
  "data-testid": dataTestId = "authority-ladder",
}) => {
  const gap = Math.max(0, requiredLevel - currentLevel);

  return (
    <div
      className={`tf-authority-ladder ${className}`.trim()}
      data-testid={dataTestId}
    >
      <span className="tf-authority-ladder__label">AUTHORITY LEVEL</span>
      <div className="tf-authority-ladder__track">
        {ALL_LEVELS.map((level) => (
          <AuthorityLadderStep
            key={level}
            level={level}
            active={level <= currentLevel}
            required={level === requiredLevel}
            current={level === currentLevel}
          />
        ))}
      </div>
      <div className="tf-authority-ladder__indicators">
        <AuthorityLadderCurrent level={currentLevel} />
        <AuthorityLadderRequired level={requiredLevel} />
        {gap > 0 && <AuthorityLadderGap gap={gap} />}
      </div>
      {gap > 0 && onEscalate && (
        <button
          type="button"
          className="tf-btn tf-btn--escalate"
          onClick={() => onEscalate(requiredLevel)}
          data-testid="authority-escalate-btn"
        >
          ESCALATE TO AUTH {requiredLevel}
        </button>
      )}
    </div>
  );
};

AuthorityLadder.displayName = "AuthorityLadder";

export default AuthorityLadder;
