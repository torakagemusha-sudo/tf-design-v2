/**
 * @fileoverview SessionAuthorityHistory — Authority usage history.
 *
 * Lists recent authority usage events for the current session,
 * including action, target, result, and trace ID.
 */

import React from "react";
import { AuthorityUsage, AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface SessionAuthorityHistoryProps extends GovernanceComponentBaseProps {
  history: AuthorityUsage[];
}

const resultClassMap: Record<string, string> = {
  success: "tf-auth-history--success",
  blocked: "tf-auth-history--blocked",
  failed: "tf-auth-history--failed",
  override: "tf-auth-history--override",
};

/**
 * SessionAuthorityHistory renders authority usage history.
 */
const SessionAuthorityHistory: React.FC<SessionAuthorityHistoryProps> = ({
  history,
  className = "",
  "data-testid": dataTestId = "session-authority-history",
}) => (
  <div
    className={`tf-session-authority-history ${className}`.trim()}
    data-testid={dataTestId}
  >
    <span className="tf-session-authority-history__label">
      AUTHORITY USAGE HISTORY
    </span>
    <ul className="tf-session-authority-history__list">
      {history.map((entry) => (
        <li
          key={entry.id}
          className={`tf-auth-history-entry ${resultClassMap[entry.result]}`}
          data-testid={`auth-history-${entry.id}`}
        >
          <time className="tf-auth-history-entry__time">{entry.timestamp}</time>
          <span className="tf-auth-history-entry__action">{entry.action}</span>
          <span className="tf-auth-history-entry__target">{entry.target}</span>
          <span className="tf-auth-history-entry__authority">
            AUTH {entry.authorityLevel} · {AUTHORITY_LEVELS[entry.authorityLevel]}
          </span>
          <span className="tf-auth-history-entry__result">
            {entry.result.toUpperCase()}
          </span>
          <code className="tf-auth-history-entry__trace">{entry.traceId}</code>
        </li>
      ))}
    </ul>
  </div>
);

SessionAuthorityHistory.displayName = "SessionAuthorityHistory";

export default SessionAuthorityHistory;
