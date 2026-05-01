/**
 * @fileoverview ApprovalCommentInput — Comment on approval.
 *
 * Textarea for entering a comment when approving, rejecting,
 * or delegating an approval request.
 */

import React from "react";
import { GovernanceComponentBaseProps } from "./types";

export interface ApprovalCommentInputProps extends GovernanceComponentBaseProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * ApprovalCommentInput captures a comment for an approval action.
 */
const ApprovalCommentInput: React.FC<ApprovalCommentInputProps> = ({
  value,
  onChange,
  className = "",
  "data-testid": dataTestId = "approval-comment-input",
}) => (
  <div
    className={`tf-approval-comment-input ${className}`.trim()}
    data-testid={dataTestId}
  >
    <label className="tf-approval-comment-input__label" htmlFor="approval-comment">
      COMMENT
    </label>
    <textarea
      id="approval-comment"
      className="tf-approval-comment-input__textarea"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Optional comment for this approval action…"
      rows={2}
      data-testid="approval-comment-textarea"
    />
  </div>
);

ApprovalCommentInput.displayName = "ApprovalCommentInput";

export default ApprovalCommentInput;
