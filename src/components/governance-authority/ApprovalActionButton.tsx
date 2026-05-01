/**
 * @fileoverview ApprovalActionButton — Approve / Reject / Delegate.
 *
 * Compact action buttons for a single approval request.
 * Each button triggers the corresponding action with comment.
 */

import React from "react";
import { GovernanceComponentBaseProps } from "./types";

export interface ApprovalActionButtonProps extends GovernanceComponentBaseProps {
  requestId: string;
  comment: string;
  onApprove?: (requestId: string, comment: string) => void;
  onReject?: (requestId: string, comment: string) => void;
  onDelegate?: (requestId: string, delegateTo: string, comment: string) => void;
}

/**
 * ApprovalActionButton renders approve/reject/delegate controls.
 */
const ApprovalActionButton: React.FC<ApprovalActionButtonProps> = ({
  requestId,
  comment,
  onApprove,
  onReject,
  onDelegate,
  className = "",
  "data-testid": dataTestId = "approval-action-button",
}) => (
  <div
    className={`tf-approval-action-buttons ${className}`.trim()}
    data-testid={dataTestId}
  >
    <button
      type="button"
      className="tf-btn tf-btn--approve"
      onClick={() => onApprove?.(requestId, comment)}
      data-testid="approval-approve-btn"
    >
      APPROVE
    </button>
    <button
      type="button"
      className="tf-btn tf-btn--reject"
      onClick={() => onReject?.(requestId, comment)}
      data-testid="approval-reject-btn"
    >
      REJECT
    </button>
    <button
      type="button"
      className="tf-btn tf-btn--delegate"
      onClick={() => {
        const delegateTo = prompt("Delegate to user:");
        if (delegateTo) onDelegate?.(requestId, delegateTo, comment);
      }}
      data-testid="approval-delegate-btn"
    >
      DELEGATE
    </button>
  </div>
);

ApprovalActionButton.displayName = "ApprovalActionButton";

export default ApprovalActionButton;
