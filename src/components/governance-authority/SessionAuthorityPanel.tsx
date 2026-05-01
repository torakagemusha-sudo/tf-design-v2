/**
 * @fileoverview SessionAuthorityPanel — Current session authority.
 *
 * Displays the operator's current authority level, effective level
 * after delegations/escalations, and active delegations. Provides
 * access to history and escalation controls.
 *
 * Torafirma Governance Component — Authority Gold / Dark Theme
 */

import React from "react";
import { SessionAuthority, AUTHORITY_LEVELS } from "./types";
import { AuthorityLevel } from "./types";
import { GovernanceComponentBaseProps } from "./types";
import SessionAuthorityHistory from "./SessionAuthorityHistory";
import AuthorityEscalationRequest from "./AuthorityEscalationRequest";
import AuthorityDelegationCard from "./AuthorityDelegationCard";
import AuthorityRevocationButton from "./AuthorityRevocationButton";

export interface SessionAuthorityPanelProps extends GovernanceComponentBaseProps {
  session: SessionAuthority;
  onEscalate?: (requestedLevel: AuthorityLevel, reason: string) => void;
  onRevokeDelegation?: (delegationId: string) => void;
  onRevokeAll?: () => void;
}

/**
 * SessionAuthorityPanel renders the operator's authority surface.
 */
const SessionAuthorityPanel: React.FC<SessionAuthorityPanelProps> = ({
  session,
  onEscalate,
  onRevokeDelegation,
  onRevokeAll,
  className = "",
  "data-testid": dataTestId = "session-authority-panel",
}) => {
  const [showHistory, setShowHistory] = React.useState(false);
  const [showEscalation, setShowEscalation] = React.useState(false);

  return (
    <div
      className={`tf-session-authority-panel ${className}`.trim()}
      data-testid={dataTestId}
    >
      <div className="tf-session-authority-panel__badge">
        <span className="tf-session-authority-panel__label">SESSION AUTHORITY</span>
        <span className="tf-session-authority-panel__level">
          AUTH {session.currentLevel} · {AUTHORITY_LEVELS[session.currentLevel]}
        </span>
        {session.effectiveLevel !== session.currentLevel && (
          <span className="tf-session-authority-panel__effective">
            EFFECTIVE: AUTH {session.effectiveLevel} ·{" "}
            {AUTHORITY_LEVELS[session.effectiveLevel]}
          </span>
        )}
      </div>

      <div className="tf-session-authority-panel__actions">
        <button
          type="button"
          className="tf-btn tf-btn--escalate"
          onClick={() => setShowEscalation(!showEscalation)}
          data-testid="toggle-escalation"
        >
          {showEscalation ? "CANCEL ESCALATION" : "REQUEST ESCALATION"}
        </button>
        <button
          type="button"
          className="tf-btn tf-btn--history"
          onClick={() => setShowHistory(!showHistory)}
          data-testid="toggle-history"
        >
          {showHistory ? "HIDE HISTORY" : "SHOW HISTORY"}
        </button>
        <AuthorityRevocationButton
          delegationCount={session.delegations.filter((d) => d.active).length}
          onRevokeAll={onRevokeAll}
        />
      </div>

      {showEscalation && (
        <AuthorityEscalationRequest
          currentLevel={session.currentLevel}
          onSubmit={(level, reason) => {
            onEscalate?.(level, reason);
            setShowEscalation(false);
          }}
        />
      )}

      {session.delegations.filter((d) => d.active).length > 0 && (
        <div className="tf-session-authority-panel__delegations">
          <span className="tf-session-authority-panel__delegations-label">
            ACTIVE DELEGATIONS
          </span>
          {session.delegations
            .filter((d) => d.active)
            .map((delegation) => (
              <AuthorityDelegationCard
                key={delegation.id}
                delegation={delegation}
                onRevoke={onRevokeDelegation}
              />
            ))}
        </div>
      )}

      {showHistory && <SessionAuthorityHistory history={session.history} />}
    </div>
  );
};

SessionAuthorityPanel.displayName = "SessionAuthorityPanel";

export default SessionAuthorityPanel;
