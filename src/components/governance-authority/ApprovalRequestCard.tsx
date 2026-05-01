/**
 * @fileoverview ApprovalRequestCard — Pending approval card.
 *
 * Displays a single approval request with its chain, priority,
 * requester info, and action buttons for approve/reject/delegate.
 *
 * Torafirma Governance Component — Authority Gold / Dark Theme
 */

import React from "react";
import { ApprovalRequest } from "./types";
import { GovernanceComponentBaseProps } from "./types";
import ApprovalActionButton from "./ApprovalActionButton";
import ApprovalCommentInput from "./ApprovalCommentInput";

export interface ApprovalRequestCardProps extends GovernanceComponentBaseProps {
  request: ApprovalRequest;
  onApprove?: (requestId: string, comment: string) => void;
  onReject?: (requestId: string, comment: string) => void;
  onDelegate?: (requestId: string, delegateTo: string, comment: string) => void;
}

const priorityClassMap: Record<string, string> = {
  low: "tf-approval-request--low",
  medium: "tf-approval-request--medium",
  high: "tf-approval-request--high",
  critical: "tf-approval-request--critical",
};

/**
 * ApprovalRequestCard renders a pending approval request.
 */
const ApprovalRequestCard: React.FC<ApprovalRequestCardProps> = ({
  request,
  onApprove,
  onReject,
  onDelegate,
  className = "",
  "data-testid": dataTestId = "approval-request-card",
}) => {
  const [comment, setComment] = React.useState("");
  const completedSteps = request.chain.steps.filter(
    (s) => s.status === "approved"
  ).length;

  return (
    <div
      className={`tf-approval-request-card ${priorityClassMap[request.priority]} ${className}`.trim()}
      data-testid={dataTestId}
    >
      <div className="tf-approval-request-card__header">
        <span className="tf-approval-request-card__id">{request.id}</span>
        <span className="tf-approval-request-card__priority">
          {request.priority.toUpperCase()}
        </span>
        <span className="tf-approval-request-card__status">
          {request.status.toUpperCase()}
        </span>
      </div>
      <h4 className="tf-approval-request-card__title">{request.title}</h4>
      <p className="tf-approval-request-card__description">{request.description}</p>
      <div className="tf-approval-request-card__meta">
        <span className="tf-approval-request-card__requester">
          {request.requester}
        </span>
        <span className="tf-approval-request-card__target">
          {request.target} ({request.targetType})
        </span>
        <span className="tf-approval-request-card__progress">
          {completedSteps} / {request.chain.steps.length} STEPS
        </span>
      </div>
      <ApprovalCommentInput value={comment} onChange={setComment} />
      <ApprovalActionButton
        requestId={request.id}
        comment={comment}
        onApprove={onApprove}
        onReject={onReject}
        onDelegate={onDelegate}
      />
    </div>
  );
};

ApprovalRequestCard.displayName = "ApprovalRequestCard";

export default ApprovalRequestCard;
