/**
 * @fileoverview AuthorityEscalationApproval — Approve escalation.
 *
 * Displays pending escalation requests with approve/reject actions.
 * Shows requester, requested level, reason, and current status.
 */

import React from "react";
import { AuthorityEscalation, AUTHORITY_LEVELS } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface AuthorityEscalationApprovalProps extends GovernanceComponentBaseProps {
  request: AuthorityEscalation;
  onApprove: (requestId: string, comment: string) => void;
  onReject: (requestId: string, comment: string) => void;
}

const statusClassMap: Record<string, string> = {
  pending: "tf-escalation-approval--pending",
  approved: "tf-escalation-approval--approved",
  rejected: "tf-escalation-approval--rejected",
  expired: "tf-escalation-approval--expired",
};

/**
 * AuthorityEscalationApproval renders an escalation approval card.
 */
const AuthorityEscalationApproval: React.FC<AuthorityEscalationApprovalProps> = ({
  request,
  onApprove,
  onReject,
  className = "",
  "data-testid": dataTestId = "authority-escalation-approval",
}) => {
  const [comment, setComment] = React.useState("");

  return (
    <div
      className={`tf-authority-escalation-approval ${statusClassMap[request.status]} ${className}`.trim()}
      data-testid={dataTestId}
    >
      <div className="tf-authority-escalation-approval__header">
        <span className="tf-authority-escalation-approval__requester">
          {request.requesterName}
        </span>
        <span className="tf-authority-escalation-approval__status">
          {request.status.toUpperCase()}
        </span>
      </div>
      <div className="tf-authority-escalation-approval__levels">
        <span className="tf-authority-escalation-approval__current">
          CURRENT: AUTH {request.currentLevel} ·{" "}
          {AUTHORITY_LEVELS[request.currentLevel]}
        </span>
        <span className="tf-authority-escalation-approval__requested">
          REQUESTED: AUTH {request.requestedLevel} ·{" "}
          {AUTHORITY_LEVELS[request.requestedLevel]}
        </span>
      </div>
      <p className="tf-authority-escalation-approval__reason">
        {request.reason}
      </p>
      <time className="tf-authority-escalation-approval__time">
        {request.requestedAt}
      </time>
      {request.status === "pending" && (
        <>
          <textarea
            className="tf-authority-escalation-approval__comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Optional review comment…"
            rows={2}
            data-testid="escalation-review-comment"
          />
          <div className="tf-authority-escalation-approval__actions">
            <button
              type="button"
              className="tf-btn tf-btn--approve"
              onClick={() => onApprove(request.id, comment)}
              data-testid="escalation-approve-btn"
            >
              APPROVE
            </button>
            <button
              type="button"
              className="tf-btn tf-btn--reject"
              onClick={() => onReject(request.id, comment)}
              data-testid="escalation-reject-btn"
            >
              REJECT
            </button>
          </div>
        </>
      )}
      {request.reviewedBy && (
        <div className="tf-authority-escalation-approval__review">
          <span>REVIEWED BY {request.reviewedBy}</span>
          <span>{request.reviewedAt}</span>
          {request.reviewComment && (
            <span>“{request.reviewComment}”</span>
          )}
        </div>
      )}
    </div>
  );
};

AuthorityEscalationApproval.displayName = "AuthorityEscalationApproval";

export default AuthorityEscalationApproval;
